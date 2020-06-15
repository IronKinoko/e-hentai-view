import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Layout from 'components/Layout'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useRouter } from 'next/router'

const menu = [{ icon: <AccountCircleIcon />, name: 'EH', path: '/setting/eh' }]
const Setting = () => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Layout title="Setting" noContainer={matches}>
      <List>
        {menu.map((o) => (
          <ListItem button key={o.path} onClick={() => router.push(o.path)}>
            <ListItemIcon>{o.icon}</ListItemIcon>
            <ListItemText primary={o.name} />
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}

export default Setting
