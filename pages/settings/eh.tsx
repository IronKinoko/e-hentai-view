import Layout from '@/components/Layout'
import Logout from '@/widgets/setting/Logout'
import UserCookie from '@/widgets/setting/UserCookie'
import { useIsmobile } from '@/theme'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import LabelIcon from '@material-ui/icons/Label'
import SettingsIcon from '@material-ui/icons/Settings'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'

const EHSetting = () => {
  const router = useRouter()
  const matches = useIsmobile()
  const [t] = useTranslation()
  const goEhConfig = () => router.push('/settings/ehconfig')
  const goEhTags = () => router.push('/settings/ehtags')
  return (
    <Layout title="EH" showBack noContainer={Boolean(matches)}>
      <List>
        <ListSubheader>{t('EH.User')}</ListSubheader>
        <Logout />
        <UserCookie />
        <ListSubheader>{t('EH.Setting')}</ListSubheader>
        <ListItem button onClick={goEhConfig}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={t('EH.EhentaiSetting')} />
          <ListItemSecondaryAction>
            <IconButton onClick={goEhConfig}>
              <ArrowRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={goEhTags}>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary={t('EH.EhentaiTags')} />
          <ListItemSecondaryAction>
            <IconButton onClick={goEhTags}>
              <ArrowRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Layout>
  )
}

export default EHSetting
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
