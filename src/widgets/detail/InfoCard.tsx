import ColorChip from '@/components/ColorChip'
import Link from '@/components/Link'
import SlideUpDialog from '@/components/SlideUpDialog'
import { IndexListItemPorps } from '@/interface/gallery'
import { useIsmobile } from '@/theme'
import {
  AppBar,
  Button,
  CardActions,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Rating } from '@mui/material'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { omit } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
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
      '/[gid]/[token]?showPage=info',
      `/${record!.gid}/${record!.token}?showPage=info`
    )
  return (
    <>
      {matches ? (
        <IconButton onClick={open} size="large">
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
                size="large"
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
        justifyContent="space-between"
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
        <Grid item container alignItems="center" justifyContent="center" xs={3}>
          <Typography align="center">{record.language}</Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <MoreInfo record={record} />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs container alignItems="center">
          <FavoriteIcon color="secondary" fontSize="inherit" />
          {record.favcount}
        </Grid>
        <Grid item xs={3} container justifyContent="center">
          {record.filecount}P
        </Grid>
        <Grid
          item
          xs={4}
          container
          justifyContent="flex-end"
          style={{ textAlign: 'right' }}
        >
          {dayjs(record.posted).format('YYYY-MM-DD HH:mm')}
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
            <td>{dayjs(record.posted).format('YYYY-MM-DD HH:mm')}</td>
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
