import React from 'react'
import { Typography, TypographyProps } from '@material-ui/core'
import useSelection from '@/hooks/useSelection'

const SelectTypography: React.FC<TypographyProps> = (props) => {
  const ref = useSelection()
  return <Typography {...props} ref={ref}></Typography>
}

export default SelectTypography
