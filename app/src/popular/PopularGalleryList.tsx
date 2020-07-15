import React from 'react'
import usePopular from 'hooks/usePopular'
import { Box, Grid } from '@material-ui/core'
import GalleryCard, { LoadingCard } from '@/index/GalleryCard'
import { useStyles } from '@/index/GalleryList'
const PopularGalleryList = () => {
  const { data } = usePopular()
  const classes = useStyles()

  return (
    <Box>
      <Grid
        container
        wrap="wrap"
        justify="flex-start"
        className={classes.container}
        spacing={2}
      >
        {!data
          ? new Array(25).fill(0).map((_, k) => <LoadingCard key={k} />)
          : data.map((o, k) => (
              <Grid item xs key={o.gid} data-index={k}>
                <GalleryCard record={o} />
              </Grid>
            ))}
      </Grid>
    </Box>
  )
}

export default PopularGalleryList
