import React from 'react'
import { useTranslation } from 'i18n'
import Layout from 'components/Layout'
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core'
import { useIsmobile } from '@/theme'
import TranslateIcon from '@material-ui/icons/Translate'
import Language from '@/setting/Language'
import { NextPage } from 'next'
import ThemeMode from '@/setting/ThemeMode'
const Advanced: NextPage = () => {
  const [t] = useTranslation()
  const matches = useIsmobile()
  return (
    <Layout title={t('Advanced')} showBack noContainer={Boolean(matches)}>
      <List>
        <Language />
        <ThemeMode />
      </List>
    </Layout>
  )
}

Advanced.getInitialProps = async () => ({ namespacesRequired: ['common'] })
export default Advanced
