import { IconButton, IconButtonProps } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import Loading from './Loading'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
  })
)
const LoadingIconButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps & { loading?: boolean }
>(({ loading, children, className, ...rest }, ref) => {
  const classes = useStyles()

  return (
    <IconButton
      ref={ref}
      className={clsx(classes.root, className)}
      {...rest}
      size="large"
    >
      {children}
      {loading && <Loading size={48} />}
    </IconButton>
  )
})
LoadingIconButton.displayName = 'LoadingIconButton'
export default LoadingIconButton
