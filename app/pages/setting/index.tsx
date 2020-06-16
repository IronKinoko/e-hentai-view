import React from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Layout from 'components/Layout'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import InfoIcon from '@material-ui/icons/Info'
import { useRouter } from 'next/router'

const menu = [
  { icon: <AccountCircleIcon />, name: 'EH', path: '/setting/eh' },
  { icon: <InfoIcon />, name: 'About', path: '/about' },
]
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
            <ListItemSecondaryAction>
              <IconButton onClick={() => router.push(o.path)}>
                <ArrowRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}

export default Setting
