import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Slider,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useRouter } from 'next/router'
import SettingsIcon from '@material-ui/icons/Settings'
import { useDebounceFn } from '@umijs/hooks'
import SafeArea from 'components/SafeArea'
import { EVENT_TOGGLE_CONTROLS } from 'constant'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: { flex: 1 },
    head: {
      top: 0,
    },
    footer: {
      bottom: 0,
      position: 'fixed',
      left: 0,
      right: 0,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 2),
    },
  })
)
const ComicControls: React.FC<{ total: number; current: number }> = ({
  total,
  current,
}) => {
  const router = useRouter()
  const classes = useStyles()
  const [currentPage, setCurrentPage] = useState(current)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setCurrentPage(current)
  }, [current])

  const { run } = useDebounceFn(() => {
    const gid = router.query.gid as string
    const token = router.query.token as string

    router.replace(
      `/[gid]/[token]/read?current=${currentPage}`,
      `/${gid}/${token}/read?current=${currentPage}`
    )
  }, 500)

  useEffect(() => {
    const fn = () => {
      setOpen((t) => !t)
    }
    document.addEventListener(EVENT_TOGGLE_CONTROLS, fn)
    return () => {
      document.removeEventListener(EVENT_TOGGLE_CONTROLS, fn)
    }
  }, [])

  if (!open) return null

  return (
    <>
      {/* head */}

      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>

          <div className={classes.title}></div>

          {/* <IconButton edge="end">
            <SettingsIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>

      {/* footer */}

      <div className={classes.footer}>
        <SafeArea>
          <Slider
            max={total}
            value={currentPage}
            valueLabelDisplay="auto"
            onChange={(e, v) => {
              setCurrentPage(v as number)
              run()
            }}
          />
          <Typography align="center">
            {currentPage + 1}/{total}
          </Typography>
        </SafeArea>
      </div>
    </>
  )
}

export default ComicControls
