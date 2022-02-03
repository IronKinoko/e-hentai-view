import { Detailpage } from '@/interface/gallery'
import { Chip, Tooltip, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
const useStyles = makeStyles(() =>
  createStyles({
    label: {},
    key: {
      lineHeight: '26px',
      whiteSpace: 'nowrap',
    },
  })
)
const TagList: React.FC<Pick<Detailpage, 'tagList'>> = ({ tagList }) => {
  const router = useRouter()
  const classes = useStyles()
  const [t, i18n] = useTranslation()
  const isChinese = i18n.language === 'zh'
  const trans = (obj: any, key: string) => obj[isChinese ? key + '_CHS' : key]
  return (
    <>
      {tagList.length === 0 && (
        <Typography align="center">{t('G.noTags')}</Typography>
      )}
      <table>
        <tbody>
          {tagList.map((o) => (
            <tr key={o.namespace}>
              <td align="right" valign="top" className={classes.key}>
                <Tooltip title={o.description} arrow>
                  <span>{trans(o, 'namespace')}</span>
                </Tooltip>
                :
              </td>
              <td>
                <div>
                  {o.tags.map((v) => (
                    <Tooltip
                      key={v.name}
                      title={i18n.language === 'zh' ? v.intro : ''}
                      arrow
                    >
                      <Chip
                        label={trans(v, 'name')}
                        size="small"
                        variant="outlined"
                        style={{
                          borderStyle: v.dash ? 'dashed' : 'solid',
                          margin: 2,
                        }}
                        classes={{ label: classes.label }}
                        clickable
                        onClick={() => {
                          router.push(`/result?f_search=${v.keyword}`)
                        }}
                      />
                    </Tooltip>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TagList
