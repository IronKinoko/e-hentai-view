import React from 'react'
import { useScrollTrigger, Slide } from '@mui/material'

interface HideOnScrollProps {
  children: React.ReactElement<any, any>
  target?: Node | Window
  direction?: 'down' | 'up'
}
const HideOnScroll: React.FC<HideOnScrollProps> = ({
  direction = 'down',
  target,
  children,
}) => {
  const trigger = useScrollTrigger({ target })

  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
