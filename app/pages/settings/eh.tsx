import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Dialog,
  Typography,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Layout from 'components/Layout'
import LabelIcon from '@material-ui/icons/Label'
import SettingsIcon from '@material-ui/icons/Settings'
import { useRouter } from 'next/router'
import { axios } from 'apis'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Logout from '@/setting/Logout'
import UserCookie from '@/setting/UserCookie'
import { useIsmobile } from '@/theme'
import { useTranslation } from 'i18n'

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
          <ListItemText primary={t('EH.Ehentai Setting')} />
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
          <ListItemText primary={t('EH.Ehentai Tags')} />
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
