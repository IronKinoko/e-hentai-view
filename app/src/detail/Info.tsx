import React, { useState } from 'react'
import { IndexListItemPorps, tagListItemProps } from 'interface/gallery'
import { makeStyles, createStyles, Theme, fade } from '@material-ui/core/styles'
import {
  Card,
  Hidden,
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Slide,
  ClickAwayListener,
  Fade,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import LoadMedia from 'components/LoadMedia'
import InfoCard from './InfoCard'
import TagList from './TagList'
import clsx from 'clsx'
import Link from 'components/Link'
import SelectTypography from 'components/SelectTypography'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import TorrentIcon from 'components/TorrentIcon'
import { useRouter } from 'next/router'
import { axios } from 'apis'
import FavIconButton from './FavIconButton'
import TorrentIconButton from './TorrentIconButton'
import ColorChip from 'components/ColorChip'
import { useTranslation, Router } from 'i18n'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { useIsmobile } from '@/theme'
import MoreVertIcon from '@material-ui/icons/MoreVert'
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
  const router = useRouter()
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
            <Tooltip title={t('Download') as string}>
              <IconButton
                color="primary"
                onClick={() =>
                  Router.push(
                    '/[gid]/[token]/download',
                    `/${info.gid}/${info.token}/download`
                  )
                }
              >
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>
            <TorrentIconButton info={info} />
            <FavIconButton info={info} />
            <Tooltip title={t('OpenEH') as string}>
              <Link
                underline="none"
                href={info.url}
                prefetch={false}
                target="_blank"
              >
                <IconButton color="primary">
                  <OpenInNewIcon />
                </IconButton>
              </Link>
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
  const [open, setOpen] = useState(false)
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
              <Fade in={!open}>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  className={classes.btn}
                  onClick={() => {
                    Router.push(
                      '/[gid]/[token]/read',
                      `/${info.gid}/${info.token}/read`
                    )
                  }}
                >
                  {t('Read')}
                </Button>
              </Fade>
            </Grid>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Grid item>
                <Fade in={!open} mountOnEnter>
                  <IconButton
                    onClick={() => setOpen(!open)}
                    className={classes.more}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Fade>
                <Fade in={open}>
                  <div className={classes.more}>
                    {/* <TorrentIconButton info={info} /> */}
                    <FavIconButton info={info} />
                    <Tooltip title={t('OpenEH') as string}>
                      <Link
                        underline="none"
                        href={info.url}
                        prefetch={false}
                        target="_blank"
                      >
                        <IconButton color="primary">
                          <OpenInNewIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </div>
                </Fade>
              </Grid>
            </ClickAwayListener>
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
