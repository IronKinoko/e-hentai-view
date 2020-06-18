import React from 'react'
import { useScrollTrigger, Slide } from '@material-ui/core'

interface HideOnScrollProps {
  children: React.ReactElement<any, any>
  target?: Node | Window
}
const HideOnScroll: React.FC<HideOnScrollProps> = ({ target, children }) => {
  const trigger = useScrollTrigger({ target })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default HideOnScroll
