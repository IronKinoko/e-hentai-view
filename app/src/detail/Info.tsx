import React from 'react'
import { IndexListItemPorps, tagListItemProps } from 'interface/gallery'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Card,
  Hidden,
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
  Grid,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import LoadMedia from 'components/LoadMedia'
import InfoCard from './InfoCard'
import TagList from './TagList'
import clsx from 'clsx'
import useSelection from 'hooks/useSelection'
import Link from 'components/Link'
import SelectTypography from 'components/SelectTypography'
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
  })
)

const Info: React.FC<{
  info: IndexListItemPorps
  tagList: tagListItemProps[]
}> = ({ info, tagList }) => {
  const classes = useStyles()

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
        <SelectTypography variant="subtitle1" gutterBottom align="center">
          {info.title_jpn}
        </SelectTypography>
        <Hidden xsDown>
          <SelectTypography variant="subtitle2" gutterBottom align="center">
            {info.title}
          </SelectTypography>
        </Hidden>
        <Divider variant="fullWidth" className={classes.divider} />
        <Grid container spacing={2} className={classes.infoContainer}>
          <Grid item>
            <InfoCard record={info} />
          </Grid>
          <Grid item xs className={classes.border} zeroMinWidth>
            <TagList tagList={tagList} />
          </Grid>
          <Grid item>
            <Button variant="text" color="primary">
              <Link naked href="/d/[gid]/[token]" as={`/d${info.path}`}>
                download
              </Link>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Info
