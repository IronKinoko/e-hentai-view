import React, { forwardRef } from 'react'
import { DialogProps, Dialog, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children?: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SlideUpDialog = forwardRef<
  unknown,
  Omit<DialogProps, 'TransitionComponent'>
>((props, ref) => {
  return (
    <Dialog ref={ref} TransitionComponent={Transition} fullWidth {...props} />
  )
})

export default SlideUpDialog
