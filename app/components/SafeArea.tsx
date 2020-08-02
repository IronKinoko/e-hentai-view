import React from 'react'
import useIsIosStandalone from 'hooks/useIsIosStandalone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles<Theme, { matches: boolean }>((theme: Theme) =>
  createStyles({
    safearea: (props) => ({
      paddingBottom: props.matches ? '30px' : 'env(safe-area-inset-bottom)',
      transition: theme.transitions.create('padding-bottom'),
      background: theme.palette.background.paper,
    }),
  })
)

const SafeArea: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  const matches = useIsIosStandalone()
  const classes = useStyles({ matches })

  return <div className={clsx(classes.safearea, className)}>{children}</div>
}

export default SafeArea
