import React from 'react'
import { Theme, alpha } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import SafeArea from '@/components/SafeArea'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 10,
      right: 0,
      zIndex: 2,
      [theme.breakpoints.up('lg')]: {
        right: 'calc((100vw - 1280px) / 2)',
      },
    },
    info: {
      background: alpha(theme.palette.grey['800'], 0.5),
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
