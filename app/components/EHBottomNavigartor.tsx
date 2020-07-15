import React from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationProps,
  Toolbar,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'i18n'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import SettingsIcon from '@material-ui/icons/Settings'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HistoryIcon from '@material-ui/icons/History'
import HomeIcon from '@material-ui/icons/Home'
import { useRouter } from 'next/router'

const MENU = [
  { title: 'Front Page', icon: <HomeIcon />, link: '/' },
  { title: 'Watched', icon: <SubscriptionsIcon />, link: '/watched' },
  { title: 'Popular', icon: <WhatshotIcon />, link: '/popular' },
  { title: 'Favorites', icon: <FavoriteIcon />, link: '/favorites' },
  { title: 'Histories', icon: <HistoryIcon />, link: '/histories' },
  // { title: 'Settings', icon: <SettingsIcon />, link: '/settings' },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      boxShadow: theme.shadows[2],
      zIndex: 9999,
    },
  })
)

const EHBottomNavigartor: React.FC = () => {
  const [t] = useTranslation()
  const router = useRouter()
  const classes = useStyles()

  const index = MENU.findIndex((v, k) => {
    let pathname = router.pathname
    if (v.link === '/') {
      if (
        pathname === '/' ||
        pathname.startsWith('/?') ||
        pathname === '/index' ||
        pathname.startsWith('/index?')
      )
        return true
    } else {
      if (pathname.startsWith(v.link)) return true
    }
    return false
  })

  if (index === -1) {
    return null
  }
  return (
    <>
      <BottomNavigation
        className={classes.root}
        showLabels
        value={index}
        onChange={(_, index) => {
          router.replace(MENU[index].link)
        }}
      >
        {MENU.map((o, k) => (
          <BottomNavigationAction key={k} label={t(o.title)} icon={o.icon} />
        ))}
      </BottomNavigation>
      <Toolbar />
    </>
  )
}

export default EHBottomNavigartor
