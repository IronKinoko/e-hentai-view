import React from 'react'
import Layout from 'components/Layout'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'i18n'
export default function Test() {
  const { t, i18n } = useTranslation()
  return (
    <Layout title="test">
      <Typography variant="h6">{t('h6')}</Typography>
      <button onClick={() => i18n.changeLanguage('en')}>en</button>
      <button onClick={() => i18n.changeLanguage('zh')}>zh</button>
    </Layout>
  )
}
