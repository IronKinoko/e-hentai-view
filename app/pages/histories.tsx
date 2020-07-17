import React, { useState } from 'react'
import Layout from 'components/Layout'
import { Box, Grid, Typography, NoSsr } from '@material-ui/core'
import GalleryCard, { LoadingCard } from '@/index/GalleryCard'
import { useStyles } from '@/index/GalleryList'
import { IndexListItemPorps } from 'interface/gallery'
import { LOCAL_HISTORY } from 'constant'
import { useTranslation } from 'i18n'
import useEnhanceLocalStorageState from 'hooks/useEnhanceLocalStorageState'

const Histories = () => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [data, setData] = useEnhanceLocalStorageState<IndexListItemPorps[]>(
    LOCAL_HISTORY,
    []
  )
  return (
    <Layout title={t('Histories')} showAvatar showSearch>
      <Box mt={2} mb={2}>
        {data.length === 0 && (
          <Typography variant="subtitle2" align="center" gutterBottom>
            {t('Search.NoThisFound')}
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

export default Histories
