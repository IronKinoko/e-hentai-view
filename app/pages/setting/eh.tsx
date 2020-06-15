import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Dialog,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Layout from 'components/Layout'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import { useRouter } from 'next/router'
import { axios } from 'apis'
import message from 'components/message'
import Logout from '@/setting/Logout'
import UserCookie from '@/setting/UserCookie'
const EHSetting = () => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const logout = async () => {
    await axios.post('/api/user/logout')
    message.success('logout success')
    router.push('/signin')
  }

  return (
    <Layout title="EH" noContainer={matches}>
      <List>
        <Logout />
        <UserCookie />
        <ListItem button onClick={() => router.push('/setting/ehconfig')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Exhentai Setting" />
        </ListItem>
      </List>
    </Layout>
  )
}

export default EHSetting
