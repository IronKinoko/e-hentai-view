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
import Link from 'components/Link'
import { useTranslation } from 'i18n'
import { useRouter } from 'next/router'
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
  return (
    <>
      <CardActions>
        <Button
          fullWidth
          onClick={() =>
            router.push(
              router.pathname + '?showPage=info',
              router.asPath + '?showPage=info'
            )
          }
        >
          {t('More')}
        </Button>
      </CardActions>
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
                {t('G.Gallery Info')}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {!matches && (
          <DialogTitle style={{ padding: theme.spacing(2, 2) }}>
            {t('G.Gallery Info')}
          </DialogTitle>
        )}
        <TableContainer component="div">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('G.Gallery Info.Key')}</TableCell>
                <TableCell>{t('G.Gallery Info.Value')}</TableCell>
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
                        {t('G.Gallery Info.' + key)}
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
        <Grid item>
          {record.tags.includes('chinese') ? 'Chinese' : 'Japanese'}
        </Grid>
        <Grid item>{record.filecount ? `${record.filecount}P` : ''}</Grid>
        <Grid item>{record.filesize}</Grid>
      </Grid>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs container alignItems="center">
          <FavoriteIcon color="secondary" fontSize="inherit" />
          {record.favcount}
        </Grid>
        <Grid item xs container justify="center">
          <Rating
            value={+(record.rating || 0)}
            readOnly
            precision={0.1}
            max={5}
          />
        </Grid>
        <Grid
          item
          xs
          container
          justify="flex-end"
          style={{ textAlign: 'right' }}
        >
          {record.time}
        </Grid>
      </Grid>
      <MoreInfo record={record} />
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
            <td>{t('G.Gallery Info.posted')}:</td>
            <td>{record.time}</td>
          </tr>
          <tr>
            <td>{t('G.Gallery Info.filesize')}:</td>
            <td>{record.filesize}</td>
          </tr>
          <tr>
            <td>{t('G.Gallery Info.filecount')}:</td>
            <td>{record.filecount}P</td>
          </tr>
          <tr>
            <td>{t('G.Gallery Info.rating')}:</td>
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
            <td>{t('G.Gallery Info.rating_count')}:</td>
            <td>{record.rating_count}</td>
          </tr>
          <tr>
            <td>{t('G.Gallery Info.favcount')}:</td>
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
