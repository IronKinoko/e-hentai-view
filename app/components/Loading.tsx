import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingBox: {
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  })
)
const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.loadingBox}>
      <CircularProgress color="primary" />
    </div>
  )
}

export default Loading
