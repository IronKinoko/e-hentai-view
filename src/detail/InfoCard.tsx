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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0, 'auto', 2),
      width: '70%',
      display: 'flex',
    },
    cover: {
      maxWidth: 240,
      minWidth: 240,
      maxHeight: 320,
      objectFit: 'contain',
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
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  return (
    <>
      <CardActions>
        <Button fullWidth onClick={() => setOpen(true)}>
          MORE
        </Button>
      </CardActions>
      <SlideUpDialog open={open} onClose={() => setOpen(false)}>
        <TableContainer component="div">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>键</TableCell>
                <TableCell>值</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!record &&
                Object.entries(
                  omit(record, ['torrents', 'torrentcount', 'expunged'])
                ).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {Array.isArray(value) ? value.join(', ') : value}
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

const MobileInfoCard: React.FC<{ record?: IndexListItemPorps }> = ({
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
          {record?.tags.includes('chinese') ? 'Chinese' : 'Japanese'}
        </Grid>
        <Grid item>{record?.filecount ? `${record.filecount} pages` : ''}</Grid>
        <Grid item>{record?.filesize}</Grid>
      </Grid>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <ColorChip label={record?.category} />
        </Grid>
        <Grid item xs container justify="center">
          <Rating
            value={+(record?.rating || 0)}
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
          {record?.time}
        </Grid>
      </Grid>
      <MoreInfo record={record} />
    </>
  )
}

const DesktopInfoCard: React.FC<{ record?: IndexListItemPorps }> = ({
  record,
}) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.cover)}>
      <ColorChip
        className={classes.chip}
        label={record?.category}
        size="small"
      />
      <Typography component="p" variant="body2" align="center" gutterBottom>
        {record?.uploader}
      </Typography>
      <table>
        <tbody>
          <tr>
            <td>Posted:</td>
            <td>{record?.time}</td>
          </tr>
          <tr>
            <td>File Size:</td>
            <td>{record?.filesize}</td>
          </tr>
          <tr>
            <td>Length:</td>
            <td>{record?.filecount}</td>
          </tr>
          <tr>
            <td>Rating:</td>
            <td>
              <Grid container alignItems="center">
                <Rating
                  name="rating"
                  size="small"
                  readOnly
                  max={5}
                  precision={0.1}
                  value={record?.rating ? +record.rating : 0}
                />
              </Grid>
            </td>
          </tr>
        </tbody>
      </table>
      <MoreInfo record={record} />
    </div>
  )
}

const InfoCard: React.FC<{ record?: IndexListItemPorps }> = ({ record }) => {
  const matches = useIsmobile()
  return matches ? (
    <MobileInfoCard record={record} />
  ) : (
    <DesktopInfoCard record={record} />
  )
}

export default InfoCard
