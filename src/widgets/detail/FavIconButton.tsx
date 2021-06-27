import { axios } from '@/apis'
import LoadingIconButton from '@/components/LoadingButton'
import useFavoritesInfo from '@/hooks/useFavoritesInfo'
import { Detailpage, IndexListItemPorps } from '@/interface/gallery'
import {
  AppBar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FolderIcon from '@material-ui/icons/Folder'
import { cloneDeep } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { forwardRef, useState } from 'react'
import { mutate } from 'swr'

interface FavIconButtonProps {
  info: IndexListItemPorps
  inMenu?: boolean
  onClick?: () => void
}
const FavIconButton = (
  { info, inMenu = false, onClick }: FavIconButtonProps,
  ref: React.ForwardedRef<unknown>
) => {
  const { data } = useFavoritesInfo()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [t] = useTranslation()
  const handleFavorite = async () => {
    if (info.favoritelink !== '') {
      update('favdel', '')
    } else {
      setOpen(true)
    }
  }

  const update = async (favcat: string | number, favoritelink: string) => {
    setLoading(true)
    await axios.put(
      `/api/favorites/add/${info.gid}/${info.token}?favcat=${favcat}`
    )
    setLoading(false)
    mutate(`/api/gallery/${info.gid}/${info.token}`, (v: Detailpage) => {
      const a = cloneDeep(v)
      a.info.favoritelink = favoritelink
      return a
    })
  }
  return (
    <>
      {inMenu ? (
        <MenuItem
          innerRef={ref}
          onClick={() => {
            handleFavorite()
            onClick?.()
          }}
        >
          <ListItemIcon>
            {info.favoritelink !== '' ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary={info.favoritelink || (t('G.Favorite.Add') as string)}
          />
        </MenuItem>
      ) : (
        <Tooltip title={info.favoritelink || (t('G.Favorite.Add') as string)}>
          <LoadingIconButton
            loading={loading}
            color="primary"
            onClick={handleFavorite}
          >
            {info.favoritelink !== '' ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </LoadingIconButton>
        </Tooltip>
      )}

      {data && (
        <SwipeableDrawer
          anchor="right"
          disableDiscovery
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
            {data.slice(1).map((o) => (
              <ListItem
                key={o.index}
                button
                onClick={() => update(o.index, o.favName)}
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
    </>
  )
}

export default forwardRef(FavIconButton)
