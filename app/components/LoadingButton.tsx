import React, { forwardRef } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Loading from './Loading'
import { IconButton, IconButtonProps } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
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
