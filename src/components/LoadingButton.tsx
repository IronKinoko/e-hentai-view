import { IconButton, IconButtonProps } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import Loading from './Loading'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      display: 'inline-block',
    },
  })
)
const LoadingIconButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps & { loading?: boolean }
>(({ loading, children, className, ...rest }, ref) => {
  const classes = useStyles()

  return (
    <IconButton ref={ref} className={clsx(classes.root, className)} {...rest}>
      {children}
      {loading && <Loading size={48} />}
    </IconButton>
  )
})
export default LoadingIconButton
