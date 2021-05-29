import React, { forwardRef } from 'react'
import { DialogProps, Dialog, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { useIsmobile } from '@/theme'

function iOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
      'MacIntel',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children?: React.ReactElement }
>(function Transition(props, ref) {
  const isMobile = useIsmobile()
  const isIOS = iOS()
  return (
    <Slide direction={isIOS && isMobile ? 'left' : 'up'} ref={ref} {...props} />
  )
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
