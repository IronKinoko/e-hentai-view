import React, { useState } from 'react'
import {
  Grid,
  Card,
  Typography,
  useMediaQuery,
  CardActions,
  Button,
  List,
  ListItem,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  DialogTitle,
} from '@material-ui/core'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles'
import SlideUpDialog from 'components/SlideUpDialog'
import { IndexListItemPorps } from 'interface/gallery'
import clsx from 'clsx'
import ColorChip from 'components/ColorChip'
import { Rating } from '@material-ui/lab'
import { omit } from 'lodash'
import { useIsmobile } from '@/theme'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Link from 'components/Link'
import { useTranslation } from 'i18n'
import { useRouter } from 'next/router'
import moment from 'moment'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0, 'auto', 2),
      width: '70%',
      display: 'flex',
    },
    infoContainer: {
      maxWidth: 240,
      maxHeight: 320,
      margin: theme.spacing(0, 'auto'),
    },
    root: {
      padding: theme.spacing(1, 0),
      color: `${theme.palette.text.secondary} !important`,
    },
    tableCell: {
      wordBreak: 'break-word',
      wordWrap: 'break-word',
    },
  })
)
const MoreInfo: React.FC<{ record?: IndexListItemPorps }> = ({ record }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useIsmobile()
  const [t] = useTranslation()
  const router = useRouter()
  const showPage = router.query.showPage as string

  const open = () =>
    router.push(
      router.pathname + '?showPage=info',
      router.asPath + '?showPage=info'
    )
  return (
    <>
      {matches ? (
        <IconButton onClick={open}>
          <KeyboardArrowRight />
        </IconButton>
      ) : (
        <CardActions>
          <Button fullWidth onClick={open}>
            {t('More')}
          </Button>
        </CardActions>
      )}
      <SlideUpDialog
        fullScreen={Boolean(matches)}
        fullWidth={!Boolean(matches)}
        open={showPage === 'info'}
        onClose={() => router.back()}
        scroll="paper"
      >
        {matches && (
          <AppBar position="sticky" style={{ marginBottom: theme.spacing(1) }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => router.back()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography style={{ marginLeft: theme.spacing(2) }} variant="h6">
                {t('G.GalleryInfo')}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {!matches && (
          <DialogTitle style={{ padding: theme.spacing(2, 2) }}>
            {t('G.GalleryInfo')}
          </DialogTitle>
        )}
        <TableContainer component="div">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('G.GalleryInfo.Key')}</TableCell>
                <TableCell>{t('G.GalleryInfo.Value')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!record &&
                Object.entries(
                  omit(record, [
                    'archiver_key',
                    'torrents',
                    'torrentcount',
                    'expunged',
                    'tags',
                    'path',
                    'posted',
                  ])
                ).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Typography variant="inherit" noWrap>
                        {t('G.GalleryInfo.' + key)}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="inherit">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SlideUpDialog>
    </>
  )
}

const MobileInfoCard: React.FC<{ record: IndexListItemPorps }> = ({
  record,
}) => {
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        wrap="nowrap"
        className={classes.root}
        justify="space-between"
      >
        <Grid item container alignItems="center" xs>
          <Typography variant="h5" color="textSecondary">
            {record.rating}
          </Typography>
          <Rating
            value={+(record.rating || 0)}
            readOnly
            precision={0.2}
            max={5}
            style={{ color: 'inherit' }}
            size="small"
          />
        </Grid>
        <Grid item container alignItems="center" justify="center" xs={3}>
          <Typography align="center">{record.language}</Typography>
        </Grid>
        <Grid item xs={4} container justify="flex-end">
          <MoreInfo record={record} />
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs container alignItems="center">
          <FavoriteIcon color="secondary" fontSize="inherit" />
          {record.favcount}
        </Grid>
        <Grid item xs={3} container justify="center">
          {record.filecount}P
        </Grid>
        <Grid
          item
          xs={4}
          container
          justify="flex-end"
          style={{ textAlign: 'right' }}
        >
          {moment.utc(record.posted).format('YYYY-MM-DD HH:mm')}
        </Grid>
      </Grid>
    </>
  )
}

const DesktopInfoCard: React.FC<{ record: IndexListItemPorps }> = ({
  record,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  return (
    <div className={clsx(classes.infoContainer)}>
      <ColorChip
        className={classes.chip}
        label={record.category}
        size="small"
      />
      <Link color="inherit" href={`/?f_search=uploader:${record.uploader}`}>
        <Typography component="p" variant="body2" align="center" gutterBottom>
          {record.uploader}
        </Typography>
      </Link>
      <table>
        <tbody>
          <tr>
            <td>{t('G.GalleryInfo.posted')}:</td>
            <td>{moment(record.posted).format('YYYY-MM-DD HH:mm')}</td>
          </tr>
          <tr>
            <td>{t('G.GalleryInfo.filesize')}:</td>
            <td>{record.filesize}</td>
          </tr>
          <tr>
            <td>{t('G.GalleryInfo.filecount')}:</td>
            <td>{record.filecount}P</td>
          </tr>
          <tr>
            <td>{t('G.GalleryInfo.rating')}:</td>
            <td>
              <Grid container alignItems="center">
                <Rating
                  name="rating"
                  size="small"
                  readOnly
                  max={5}
                  precision={0.1}
                  value={record.rating ? +record.rating : 0}
                />
                <Typography variant="inherit">{record.rating}</Typography>
              </Grid>
            </td>
          </tr>
          <tr>
            <td>{t('G.GalleryInfo.rating_count')}:</td>
            <td>{record.rating_count}</td>
          </tr>
          <tr>
            <td>{t('G.GalleryInfo.favcount')}:</td>
            <td>{record.favcount}</td>
          </tr>
        </tbody>
      </table>
      <MoreInfo record={record} />
    </div>
  )
}

const InfoCard: React.FC<{ record?: IndexListItemPorps }> = ({ record }) => {
  const matches = useIsmobile()
  if (!record) return null
  return matches ? (
    <MobileInfoCard record={record} />
  ) : (
    <DesktopInfoCard record={record} />
  )
}

export default InfoCard
