import React from 'react'
import { Chip, ChipProps } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Category } from 'apis/page'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0),
      borderRadius: 2,
      border: 0,
      color: '#fff',
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
      className={clsx(classes.root, classes[label as Category], className)}
      label={(label as string).replace('_', ' ')}
      {...rest}
    />
  )
}

export default ColorChip
