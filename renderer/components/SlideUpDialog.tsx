import React from 'react'
import { DialogProps, Dialog, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SlideUpDialog: React.FC<Omit<DialogProps, 'TransitionComponent'>> = (
  props
) => {
  return <Dialog TransitionComponent={Transition} fullWidth {...props}></Dialog>
}

export default SlideUpDialog
