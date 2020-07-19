import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CircularProgress, CircularProgressProps } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingBox: {
      position: 'absolute',
      zIndex: 1,
      top: 'calc(50% + 3px)',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  })
)
const Loading: React.FC<CircularProgressProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.loadingBox}>
      <CircularProgress color="primary" {...props} />
    </div>
  )
}

export default Loading
