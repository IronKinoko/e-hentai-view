import {
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HistoryIcon from '@material-ui/icons/History'
import HomeIcon from '@material-ui/icons/Home'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { forwardRef } from 'react'
import SafeArea from './SafeArea'
const MENU = [
  { title: 'FrontPage', icon: <HomeIcon />, link: '/' },
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
      zIndex: theme.zIndex.drawer - 1,
      background: theme.palette.background.paper,
      transition: theme.transitions.create('transform'),
    },
    scrollTrigger: {
      transform: 'translateY(100%)',
    },
  })
)

const EHBottomNavigartor = forwardRef<HTMLDivElement>((_, ref) => {
  const [t] = useTranslation()
  const router = useRouter()
  const classes = useStyles()
  const trigger = useScrollTrigger()
  const index = MENU.findIndex((v) => {
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
    <footer ref={ref}>
      <SafeArea
        className={clsx(classes.root, { [classes.scrollTrigger]: trigger })}
      >
        <BottomNavigation
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
      </SafeArea>
      <Toolbar />
    </footer>
  )
})

export default EHBottomNavigartor
