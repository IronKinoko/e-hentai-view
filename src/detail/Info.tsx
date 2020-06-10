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
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import LoadMedia from 'components/LoadMedia'
import InfoCard from './InfoCard'
import TagList from './TagList'
import clsx from 'clsx'
import useSelection from 'hooks/useSelection'
import Link from 'components/Link'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
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
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
      borderWidth: '0 1px',
      flex: 1,
      padding: theme.spacing(0, 1),
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down('sm')]: {
        borderWidth: '1px 0',
        padding: theme.spacing(1, 0),
        margin: theme.spacing(1, 0),
      },
    },

    infoContainer: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
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

  const selectionRef = useSelection<HTMLHeadingElement>()
  const selectionRef2 = useSelection<HTMLHeadingElement>()
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
        <Typography
          variant="subtitle1"
          component="h6"
          gutterBottom
          align="center"
          ref={selectionRef}
        >
          {info.title_jpn}
        </Typography>
        <Typography
          variant="subtitle2"
          component="h5"
          gutterBottom
          align="center"
          ref={selectionRef2}
        >
          {info.title}
        </Typography>
        <Divider variant="fullWidth" className={classes.divider} />
        <Box display="flex" className={classes.infoContainer}>
          <InfoCard record={info} />
          <div className={classes.border}>
            <TagList tagList={tagList} />
          </div>
          <div>
            <Button variant="text" color="primary">
              <Link naked href="/d/[gid]/[token]" as={`/d${info.path}`}>
                download
              </Link>
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Info
