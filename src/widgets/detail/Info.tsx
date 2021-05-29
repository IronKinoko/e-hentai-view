import ColorChip from '@/components/ColorChip'
import Link from '@/components/Link'
import LoadMedia from '@/components/LoadMedia'
import SelectTypography from '@/components/SelectTypography'
import useComicReadPageHistory from '@/hooks/useComicReadPageHistory'
import { IndexListItemPorps, tagListItemProps } from '@/interface/gallery'
import { useIsmobile } from '@/theme'
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Hidden,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import PageviewIcon from '@material-ui/icons/PageviewOutlined'
import { Skeleton } from '@material-ui/lab'
import clsx from 'clsx'
import { isNil } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FavIconButton from './FavIconButton'
import InfoCard from './InfoCard'
import TagList from './TagList'
import TorrentIconButton from './TorrentIconButton'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      minWidth: 0,
    },

    cover: {
      margin: theme.spacing(0, 'auto'),
      maxHeight: 320,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
    },
    divider: { margin: theme.spacing(1, 0) },

    border: {
      overflow: 'auto',
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
      borderWidth: '0 1px',
      [theme.breakpoints.down('xs')]: {
        borderWidth: '1px 0',
      },
    },

    infoContainer: {
      [theme.breakpoints.down('xs')]: {
        display: 'block',
      },
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 93px)',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
    smTitle: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        '& *': {
          textAlign: 'left !important',
        },
      },
    },
    smallCover: {
      width: 103,
      height: 150,
      marginRight: theme.spacing(2),
      flexShrink: 0,
    },
    actions: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
)

interface InfoProps {
  info: IndexListItemPorps
  tagList: tagListItemProps[]
}

const Info: React.FC<InfoProps> = ({ info, tagList }) => {
  const classes = useStyles()
  const [t] = useTranslation()
  return (
    <Card className={classes.root}>
      <Hidden smDown>
        {info.thumb ? (
          <div className={classes.center}>
            <LoadMedia className={clsx(classes.cover)} src={info.thumb} />
          </div>
        ) : (
          <Skeleton variant="rect" animation="wave" width={240} height={320} />
        )}
      </Hidden>
      <CardContent className={classes.details}>
        <div className={classes.smTitle}>
          <Hidden smUp>
            <LoadMedia className={clsx(classes.smallCover)} src={info.thumb} />
          </Hidden>
          <div>
            <SelectTypography variant="subtitle1" gutterBottom align="center">
              {info.title_jpn}
            </SelectTypography>
            <Hidden smUp>
              <Link
                color="inherit"
                href={`/?f_search=uploader:${info.uploader}`}
              >
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  color="textSecondary"
                >
                  {info.uploader}
                </Typography>
              </Link>
              <ColorChip label={info.category} />
            </Hidden>
          </div>

          <Hidden xsDown>
            <SelectTypography variant="subtitle2" gutterBottom align="center">
              {info.title}
            </SelectTypography>
          </Hidden>
        </div>
        <Divider variant="fullWidth" className={classes.divider} />
        <Grid container spacing={2} className={classes.infoContainer}>
          <Grid item>
            <InfoCard record={info} />
          </Grid>
          <Grid item xs className={classes.border} zeroMinWidth>
            <TagList tagList={tagList} />
          </Grid>
          <Grid item className={classes.actions}>
            <TorrentIconButton info={info} />
            <FavIconButton info={info} />
            <Tooltip title={t('OpenEH') as string}>
              <a href={info.url} target="_blank" rel="noreferrer">
                <IconButton color="primary">
                  <OpenInNewIcon />
                </IconButton>
              </a>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const useStylesMobile = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingBottom: 6,
    },
    smallCover: {
      width: 120,
      height: 120 * 1.4,
      marginRight: theme.spacing(2),
      flexShrink: 0,
    },
    title: {
      display: '-webkit-box',
      lineClamp: 2,
      WebkitLineClamp: 2,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
    },
    btn: {
      borderRadius: 18,
      padding: theme.spacing(0.75, 4),
      backgroundColor: fade(theme.palette.primary.main, 0.8),
    },
    oneline: {
      position: 'relative',
      height: 48,
      marginBottom: -6,
    },
    more: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
    divider: {
      margin: theme.spacing(1, 0),
    },
  })
)

const MobileInfo: React.FC<InfoProps> = ({ info, tagList }) => {
  const classes = useStylesMobile()
  const router = useRouter()
  const [t] = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [comicReadPageHistory] = useComicReadPageHistory()
  const latestReadPage = comicReadPageHistory[`/${info.gid}/${info.token}/read`]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSimilar = () => {
    // filter [] () 【】 info
    const re = /(\([^()]*\))|(\[[^\[\]]*\])|(【[^【】]*】)/g
    const f_search = info.title.replace(re, '').trim()
    router.push('/result?f_search=' + encodeURIComponent(f_search))
  }

  return (
    <>
      <div className={classes.root}>
        <LoadMedia src={info.thumb} className={classes.smallCover} />
        <Grid container direction="column">
          <SelectTypography
            variant="subtitle1"
            align="left"
            className={classes.title}
          >
            {info.title_jpn}
          </SelectTypography>
          <Link color="inherit" href={`/?f_search=uploader:${info.uploader}`}>
            <Typography gutterBottom variant="subtitle2" color="textSecondary">
              {info.uploader}
            </Typography>
          </Link>
          <Grid item>
            <ColorChip label={info.category} />
          </Grid>
          <Grid item xs />
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.oneline}
          >
            <Grid item>
              <Button
                disableElevation
                color="primary"
                variant="contained"
                className={classes.btn}
                onClick={() => {
                  router.push(
                    latestReadPage
                      ? `/[gid]/[token]/read?current=${latestReadPage}`
                      : '/[gid]/[token]/read',
                    latestReadPage
                      ? `/${info.gid}/${info.token}/read?current=${latestReadPage}`
                      : `/${info.gid}/${info.token}/read`
                  )
                }}
              >
                {`${t('Read')}${
                  isNil(latestReadPage) ? '' : ` ${latestReadPage + 1}p`
                }`}
              </Button>
            </Grid>
            <Grid item>
              <IconButton
                onClick={handleClick}
                aria-controls="action-menu"
                aria-haspopup="true"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="action-menu"
                open={Boolean(anchorEl)}
                keepMounted
                onClose={handleClose}
              >
                <FavIconButton info={info} inMenu onClick={handleClose} />
                <MenuItem onClick={handleSimilar}>
                  <ListItemIcon color="primary">
                    <PageviewIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Similar') as string} />
                </MenuItem>
                <a href={info.url} target="_blank">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon color="primary">
                      <OpenInNewIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('OpenEH') as string} />
                  </MenuItem>
                </a>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/* <Divider className={classes.divider} /> */}
      <InfoCard record={info} />
      <Divider className={classes.divider} />
      <div style={{ overflow: 'auto' }}>
        <TagList tagList={tagList} />
      </div>
      <Divider className={classes.divider} />
    </>
  )
}

const InfoWrap = (props: InfoProps) => {
  const matches = useIsmobile()
  if (matches) {
    return <MobileInfo {...props} />
  } else {
    return <Info {...props} />
  }
}
export default InfoWrap
