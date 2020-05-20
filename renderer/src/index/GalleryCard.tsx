import React from 'react'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Link from 'components/Link'
import LoadMedia from 'components/LoadMedia'
import ColorChip from './ColorChip'
import { IndexListItemPorps } from 'apis/page'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: { fontSize: '10pt', height: 36, overflow: 'hidden' },
    card: { width: 250, margin: theme.spacing(0, 'auto') },
  })
)

const GalleryCard: React.FC<{ record: IndexListItemPorps }> = ({ record }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Link
        naked
        href={{
          pathname: '/detail',
          query: {
            filecount: record.filecount,
            gid: record.gid,
            token: record.token,
          },
        }}
      >
        <CardActionArea>
          <LoadMedia
            alt={record.title_jpn}
            image={record.thumb}
            title={record.title_jpn}
            height={350}
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom align="center" className={classes.title} component="h2">
              {record.title_jpn}
            </Typography>
            <Grid container alignItems="center" justify="space-between">
              <ColorChip variant="outlined" label={record.category} size="small" />
              <Rating max={5} value={+record.rating} readOnly />
            </Grid>
            <Grid container>
              <Grid item xs>
                <Typography variant="body2" color="textPrimary" component="span">
                  {record.time}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textPrimary" component="span">
                  {record.filecount} pages
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default GalleryCard
