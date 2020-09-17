import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import FavoritesGalleryList from '@/favorites/FavoritesGalleryList'
import useFavoritesInfo from 'hooks/useFavoritesInfo'
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'
import { useRouter } from 'next/router'
import FolderIcon from '@material-ui/icons/Folder'
import { divide } from 'lodash'
import { useTranslation, Router } from 'i18n'
const Favorites: NextPage = () => {
  const { data } = useFavoritesInfo()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const favcat = router.query.favcat as string
  const [t] = useTranslation()
  return (
    <Layout
      title={t('Favorites')}
      gutterBottom
      showAvatar
      showSearch
      tool={
        <>
          <IconButton edge="end" color="inherit" onClick={() => setOpen(true)}>
            <ListIcon />
          </IconButton>
        </>
      }
    >
      <FavoritesGalleryList key={favcat} favcat={favcat} />
      {data && (
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">{t('Favorites')}</Typography>
            </Toolbar>
          </AppBar>
          <List onClick={() => setOpen(false)} style={{ width: 250 }}>
            {data.map((o) => (
              <ListItem
                key={o.index}
                button
                onClick={() => Router.push('/favorites?favcat=' + o.index)}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText>
                  <Grid container>
                    <Grid item xs zeroMinWidth>
                      <Typography noWrap>{o.favName}</Typography>
                    </Grid>
                    <Grid>
                      <Typography>{o.count}</Typography>
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      )}
    </Layout>
  )
}

export default Favorites
Favorites.getInitialProps = async () => ({})
