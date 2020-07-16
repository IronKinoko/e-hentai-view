import React, { useEffect, useState } from 'react'
import { setting } from 'apis'
import { NextPage } from 'next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Layout from 'components/Layout'
import { CircularProgress } from '@material-ui/core'
import Loading from 'components/Loading'
import { useTranslation } from 'i18n'

const EHConfig: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [t] = useTranslation()
  useEffect(() => {
    setting()
    return () => {
      setting()
    }
  }, [])
  return (
    <Layout title={t('EH.EhentaiSetting')} showBack noContainer fullScreen>
      <iframe
        src="https://exhentai.org/uconfig.php"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => {
          setLoading(false)
        }}
      />
      {loading && <Loading />}
    </Layout>
  )
}

export default EHConfig
