import React, { useEffect, useState, useCallback, useRef } from 'react'
import jsZip from 'jszip'
import message from 'components/message'
import { saveAs } from 'file-saver'
import {
  IndexListItemPorps,
  tagListItemProps,
  Detailpage,
  DetailPageListItemProps,
} from 'interface/gallery'
import useGallery from './useGallery'
import { axios, loadImg, loadMorePage } from 'apis'

export interface ProgessProps {
  total: number
  done: number
  buffer: number
  success: [string, string][]
  error: string[]
}
export default function useDownload(
  gid: string,
  token: string
): [Detailpage | undefined, ProgessProps, () => Promise<void>] {
  const url = `/${gid}/${token}`
  const { data } = useGallery({ url })
  const doneRef = useRef<boolean[]>([])
  const onceRef = useRef(true)
  const [progess, setProgess] = useState<ProgessProps>({
    total: 0,
    done: 0,
    buffer: 0,
    error: [],
    success: [],
  })
  const [pageList, setPageList] = useState<string[]>([])
  useEffect(() => {
    if (data && onceRef.current) {
      onceRef.current = false
      const fn = async () => {
        const total = parseInt(data.info.filecount)
        setProgess((t) => ({ ...t, total }))
        setPageList(data.list.map((o) => o.url))
        const page = Math.ceil(total / 20)
        for (let i = 1; i < page; i++) {
          const nextList = await loadMorePage(`/api/gallery${url}/${i}`)
          setPageList((t) => [...t, ...nextList.map((o) => o.url)])
        }
      }
      fn()
    }
  }, [data, url])

  useEffect(() => {
    if (pageList.length > 0) {
      pageList.forEach(async (url, k) => {
        try {
          if (doneRef.current[k]) return
          doneRef.current[k] = true
          const src = await loadImg(url)
          setProgess((t) => ({ ...t, buffer: t.buffer + 1 }))
          const [dataURL, ext] = (
            await axios.get('/api/gallery/img?url=' + src)
          ).data

          setProgess((t) => {
            const success = [...t.success]
            success[k] = [dataURL, ext]
            return { ...t, success, done: t.done + 1 }
          })
        } catch (e) {
          doneRef.current[k] = false
          setProgess((t) => ({ ...t, error: [...t.error, e.message] }))
        }
      })
    }
  }, [pageList])
  const fn = useCallback(async () => {
    if (!data) return
    await DownloadAllImg(progess.success, data.info, data.tagList)
  }, [data, progess.success])
  return [data, progess, fn]
}

export async function DownloadAllImg(
  base64s: [string, string][],
  record: IndexListItemPorps,
  tagList: tagListItemProps[]
) {
  console.log(base64s)
  let zip = new jsZip()
  base64s.forEach(([base64, ext], k) => {
    zip.file(
      `${String(k).padStart(record.filecount.length, '0')}.${ext}`,
      base64,
      { base64: true }
    )
  })

  zip.file('info.json', JSON.stringify({ ...record, tagList }, null, 2))
  const res = await zip.generateAsync({ type: 'blob' })
  saveAs(res, record.title_jpn)
  message.success('download without error', 1.5e3)
}
