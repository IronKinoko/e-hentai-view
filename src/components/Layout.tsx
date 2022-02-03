import HideOnScroll from '@/components/HideOnScroll'
import Link from '@/components/Link'
import {
  AppBar,
  Avatar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { UrlObject } from 'url'
import EHBottomNavigartor from './EHBottomNavigartor'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    link: {
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    header: {
      height: 40,
    },
    bakcdrop: {
      zIndex: theme.zIndex.speedDial - 1,
    },
    title: {
      flexGrow: 1,
      // marginLeft: theme.spacing(2),
    },

    list: { minWidth: 250, flexGrow: 1 },
    fullScreen: {
      position: 'fixed',
      top: 56,
      right: 0,
      bottom: 0,
      left: 0,
    },
    avatarSize: {
      width: 24,
      height: 24,
    },
  })
)

const MENU = [
  { title: 'FrontPage', icon: <HomeIcon />, link: '/' },
  { title: 'Watched', icon: <SubscriptionsIcon />, link: '/watched' },
  { title: 'Popular', icon: <WhatshotIcon />, link: '/popular' },
  { title: 'Favorites', icon: <FavoriteIcon />, link: '/favorites' },
  { title: 'Histories', icon: <HistoryIcon />, link: '/histories' },
]

const SettingsMenuInfo = {
  title: 'Settings',
  icon: <SettingsIcon />,
  link: '/settings',
}
type Props = {
  title?: string
  noContainer?: boolean | null
  fullScreen?: boolean
  tool?: React.ReactNode
  showBack?: boolean | UrlObject | string
  showSearch?: boolean
  showAvatar?: boolean
  style?: React.CSSProperties
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  noContainer,
  fullScreen,
  showBack,
  tool,
  showAvatar,
  showSearch,
  style,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{title ? title + ' - EhentaiView' : 'EhentaiView'}</title>
      </Head>
      <HideOnScroll>
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            {showBack && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() =>
                  typeof showBack === 'boolean'
                    ? router.back()
                    : router.replace(showBack, undefined, {
                        locale: router.locale,
                      })
                }
                size="large"
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title} noWrap>
              {title || 'EhentaiView'}
            </Typography>
            <Hidden smDown>
              {MENU.map((o) => (
                <Tooltip key={o.title} title={t(o.title) as string}>
                  <Link href={o.link} naked>
                    <IconButton color="inherit" size="large">
                      {o.icon}
                    </IconButton>
                  </Link>
                </Tooltip>
              ))}
            </Hidden>

            {showSearch && (
              <Tooltip title={t('Search') as string}>
                <Link href={'/search'} naked>
                  <IconButton size="large">
                    <SearchIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            )}
            {showAvatar && (
              <Tooltip title={t(SettingsMenuInfo.title) as string}>
                <Link
                  href={{
                    pathname: SettingsMenuInfo.link,
                    query: { from: router.pathname },
                  }}
                  naked
                >
                  <IconButton edge={tool ? undefined : 'end'} size="large">
                    <Avatar
                      src="/static/panda.png"
                      classes={{ root: classes.avatarSize }}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
            )}
            {tool}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <div
        className={clsx({
          [classes.fullScreen]: fullScreen,
        })}
      >
        {noContainer ? (
          children
        ) : (
          <Container maxWidth="lg" style={{ minHeight: '100%', ...style }}>
            <>{children}</>
          </Container>
        )}
      </div>
      <EHBottomNavigartor />
    </>
  )
}
// @ts-ignore
// eslint-disable-next-line
function Copyright() {
  return (
    <List dense>
      <a href="https://github.com/IronKinoko" target="_blank" rel="noreferrer">
        <ListItem button>
          <ListItemText
            primaryTypographyProps={{
              variant: 'subtitle2',
              color: 'textSecondary',
            }}
            primary={`Copyright @${new Date().getFullYear()} Kinoko`}
            secondary={'Ver.' + process.env.VERSION}
          />
        </ListItem>
      </a>
    </List>
  )
}
export default Layout
