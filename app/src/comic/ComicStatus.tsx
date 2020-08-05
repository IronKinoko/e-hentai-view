import React from 'react'
import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles'
import SafeArea from 'components/SafeArea'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 10,
      right: 0,
      [theme.breakpoints.up('lg')]: {
        right: 'calc((100vw - 1280px) / 2)',
      },
    },
    info: {
      background: fade(theme.palette.grey['800'], 0.5),
      padding: theme.spacing(0.5, 1),
      borderRadius: '16px 0 0 16px',
      color: theme.palette.common.white,
    },
  })
)

const ComicStatus: React.FC<{ total: number; current: number }> = ({
  total,
  current,
}) => {
  const classes = useStyles()
  return (
    <SafeArea className={classes.root}>
      <div className={classes.info}>
        {current + 1} / {total}
      </div>
    </SafeArea>
  )
}

export default ComicStatus
