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
import SettingsIcon from '@material-ui/icons/Settings'
import InfoIcon from '@material-ui/icons/Info'
import { useRouter } from 'next/router'
import { useTranslation } from 'i18n'
import { useIsmobile } from '@/theme'

const menu = [
  { icon: <AccountCircleIcon />, name: 'EH', path: '/settings/eh' },
  { icon: <SettingsIcon />, name: 'Advanced', path: '/settings/advanced' },
  { icon: <InfoIcon />, name: 'About', path: '/about' },
]
const Setting = () => {
  const router = useRouter()
  const matches = useIsmobile()

  const { t } = useTranslation()
  return (
    <Layout title={t('Settings')} noContainer={Boolean(matches)}>
      <List>
        {menu.map((o) => (
          <ListItem button key={o.path} onClick={() => router.push(o.path)}>
            <ListItemIcon>{o.icon}</ListItemIcon>
            <ListItemText primary={t(o.name)} />
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
