import * as React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { Divider, Box, Typography, Container, Grid } from '@material-ui/core'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { useThemeState } from 'src/theme'
import HomeIcon from '@material-ui/icons/Home'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import HttpIcon from '@material-ui/icons/Http'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Link from 'components/Link'
type Props = {
  title?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

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
  })
)

const MENU = [
  { title: 'Front Page', link: '/index?page=0' },
  { title: 'Settings', link: '/setting' },
]

const Layout: React.FunctionComponent<Props> = ({ children, title }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const dispatch = useThemeState()
  const aciton = React.useMemo(() => {
    const aciton = [
      {
        label: 'home',
        icon: <HomeIcon />,
        onClick: () => {
          Router.push('/index?page=0')
          document.scrollingElement?.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth',
          })
        },
      },
      {
        label: 'Top',
        icon: <VerticalAlignTopIcon />,
        onClick: () => {
          document.scrollingElement?.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth',
          })
        },
      },
      {
        label: 'goBack',
        icon: <ArrowBackIcon />,
        onClick: () => {
          Router.back()
        },
      },
      {
        label: 'dark/light',
        icon:
          theme.palette.type === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          ),
        onClick: () => {
          theme.palette.type === 'dark'
            ? dispatch({ type: 'CHANGE', payload: { paletteType: 'light' } })
            : dispatch({ type: 'CHANGE', payload: { paletteType: 'dark' } })
        },
      },
    ]

    if (process.env.NODE_ENV === 'development') {
      aciton.push({
        label: 'test',
        icon: <HttpIcon />,
        onClick: () => {
          Router.push('/test')
        },
      })
    }

    return aciton
  }, [theme.palette.type, dispatch])
  return (
    <div className={classes.root}>
      <Head>
        <title>{title ? title + ' - EhentaiView' : 'EhentaiView'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container style={{ maxWidth: 1600 }}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.header}
          spacing={1}
        >
          {MENU.map((o) => (
            <Grid item key={o.link}>
              <Link href={o.link} naked className={classes.link}>
                {o.title}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      {children}
      <SpeedDial
        className={classes.speedDial}
        ariaLabel="SpeedDial tooltip example"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        icon={<SpeedDialIcon />}
      >
        {aciton.map((o) => (
          <SpeedDialAction
            key={o.label}
            tooltipOpen
            tooltipTitle={o.label}
            icon={o.icon}
            onClick={o.onClick}
          />
        ))}
      </SpeedDial>
      <footer>
        <Divider variant="middle" />
        <Box m={2}>
          <Copyright />
        </Box>
      </footer>
    </div>
  )
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright @{new Date().getFullYear()}{' '}
      <a href="https://github.com/IronKinoko" target="_blank">
        Kinoko
      </a>
    </Typography>
  )
}
export default Layout
