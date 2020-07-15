import React, { useState } from 'react'
import Layout from 'components/Layout'
import { Box, Grid, Typography, NoSsr } from '@material-ui/core'
import GalleryCard, { LoadingCard } from '@/index/GalleryCard'
import { useStyles } from '@/index/GalleryList'
import { IndexListItemPorps } from 'interface/gallery'
import { LOCAL_HISTORY } from 'constant'
import { useLocalStorageState } from '@umijs/hooks'
import { useTranslation } from 'i18n'
const Histories = () => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [data, setData] = useLocalStorageState<IndexListItemPorps[]>(
    LOCAL_HISTORY,
    []
  )
  return (
    <Layout title={t('Histories')} showAvatar showSearch>
      <Box mt={2}>
        {data.length === 0 && (
          <Typography variant="subtitle2" align="center" gutterBottom>
            {t('Search.No this found')}
          </Typography>
        )}
        <Grid
          container
          wrap="wrap"
          justify="flex-start"
          className={classes.container}
          spacing={2}
        >
          {data.map((o, k) => (
            <Grid item xs key={o.gid} data-index={k}>
              <GalleryCard record={o} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default () => (
  <NoSsr>
    <Histories />
  </NoSsr>
)
