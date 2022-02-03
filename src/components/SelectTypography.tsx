import React from 'react'
import { Typography, TypographyProps } from '@mui/material'
import useSelection from '@/hooks/useSelection'

const SelectTypography: React.FC<TypographyProps> = (props) => {
  const ref = useSelection()
  return <Typography {...props} ref={ref}></Typography>
}

export default SelectTypography
