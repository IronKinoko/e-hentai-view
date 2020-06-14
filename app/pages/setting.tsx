import React, { useEffect } from 'react'
import { setting } from 'apis'
import { NextPage } from 'next'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Layout from 'components/Layout'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: 'calc(100vh - 93px)',
    },
  })
)
const Setting: NextPage = () => {
  const classes = useStyles()

  useEffect(() => {
    setting()
    return () => {
      setting()
    }
  }, [])
  return (
    <Layout noContainer>
      <iframe
        src="https://exhentai.org/uconfig.php"
        frameBorder="0"
        className={classes.root}
      ></iframe>
    </Layout>
  )
}

export default Setting
