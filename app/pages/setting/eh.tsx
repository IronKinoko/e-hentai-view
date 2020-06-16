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

const EHSetting = () => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const goEhConfig = () => router.push('/setting/ehconfig')
  const goEhTags = () => router.push('/setting/ehtags')
  return (
    <Layout title="EH" noContainer={matches}>
      <List>
        <ListSubheader>User</ListSubheader>
        <Logout />
        <UserCookie />
        <ListSubheader>Setting</ListSubheader>
        <ListItem button onClick={goEhConfig}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Ehentai Setting" />
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
          <ListItemText primary="Ehentai Tags" />
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
