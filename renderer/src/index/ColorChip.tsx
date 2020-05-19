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
    [Category.Doujinshi]: { backgroundColor: '#9E2720' },
    [Category.Manga]: { backgroundColor: '#DB6C24' },
    [Category['Non-H']]: { backgroundColor: '#5FA9CF' },
  }),
)

const ColorChip: React.FC<ChipProps> = ({ label, className, ...rest }) => {
  const classes = useStyles()
  return (
    <Chip
      className={clsx(classes.root, classes[label as Category], className)}
      label={label}
      {...rest}
    />
  )
}

export default ColorChip
