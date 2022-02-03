import Layout from '@/components/Layout'
import { useIsmobile } from '@/theme'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'

const menu = [
  { icon: <AccountCircleIcon />, name: 'EH', path: '/settings/eh' },
  { icon: <SettingsIcon />, name: 'Advanced', path: '/settings/advanced' },
  { icon: <InfoIcon />, name: 'About', path: '/about' },
]
const Setting = () => {
  const router = useRouter()
  const matches = useIsmobile()
  const { t } = useTranslation()

  const handleNextPage = (pathname: string) => {
    router.push({ pathname, query: router.query })
  }

  return (
    <Layout
      title={t('Settings')}
      showBack={(router.query.from as string) || '/'}
      noContainer={Boolean(matches)}
    >
      <List>
        {menu.map((o) => (
          <ListItem button key={o.path} onClick={() => handleNextPage(o.path)}>
            <ListItemIcon>{o.icon}</ListItemIcon>
            <ListItemText primary={t(o.name)} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleNextPage(o.path)} size="large">
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
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
