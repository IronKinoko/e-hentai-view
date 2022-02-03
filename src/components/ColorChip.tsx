import React from 'react'
import { Chip, ChipProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import clsx from 'clsx'
import { Category } from '@/interface/gallery'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 2,
      border: 0,
      color: '#fff',
      height: 28,
    },
    label: {
      padding: theme.spacing(0, 1),
    },
    [Category['Doujinshi']]: { backgroundColor: '#9E2720' },
    [Category['Manga']]: { backgroundColor: '#DB6C24' },
    [Category['Artist_CG']]: { backgroundColor: '#D38F1D' },
    [Category['Game_CG']]: { backgroundColor: '#6A936D' },
    [Category['Western']]: { backgroundColor: '#AB9F60' },
    [Category['Non-H']]: { backgroundColor: '#5FA9CF' },
    [Category['Image_Set']]: { backgroundColor: '#325CA2' },
    [Category['Cosplay']]: { backgroundColor: '#6A32A2' },
    [Category['Asian_Porn']]: { backgroundColor: '#A23282' },
    [Category['Misc']]: { backgroundColor: '#777777' },
  })
)

const ColorChip: React.FC<ChipProps> = ({ label, className, ...rest }) => {
  const classes = useStyles()
  return (
    <Chip
      className={clsx(
        classes.root,
        classes[(label as string).replace(' ', '_') as Category],
        className
      )}
      classes={{ label: classes.label }}
      label={(label as string) || ''}
      {...rest}
    />
  )
}

export default ColorChip
