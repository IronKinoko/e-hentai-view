import Layout from '@/components/Layout'
import GalleryList from '@/components/GalleryList'
import useFavoritesInfo from '@/hooks/useFavoritesInfo'
import {
  AppBar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import ListIcon from '@material-ui/icons/List'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
const Favorites: NextPage = () => {
  const { data } = useFavoritesInfo()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const favcat = router.query.favcat as string
  const [t] = useTranslation()
  return (
    <Layout
      title={t('Favorites')}
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
      <GalleryList key={favcat} mode="favorites" favcat={favcat} />
      {data && (
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6">{t('Favorites')}</Typography>
            </Toolbar>
          </AppBar>
          <List onClick={() => setOpen(false)} style={{ width: 250 }}>
            {data.map((o) => (
              <ListItem
                key={o.index}
                button
                onClick={() => router.push('/favorites?favcat=' + o.index)}
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
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
