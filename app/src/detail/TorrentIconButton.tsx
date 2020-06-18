import React, { useState } from 'react'
import {
  Tooltip,
  IconButton,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
  Grid,
  Link,
  AppBar,
  Toolbar,
  Typography,
  DialogTitle,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import TorrentIcon from 'components/TorrentIcon'
import { IndexListItemPorps } from 'interface/gallery'
import SlideUpDialog from 'components/SlideUpDialog'
import { useIsmobile } from '@/theme'
import { useTranslation } from 'i18n'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useRouter } from 'next/router'

const TorrentIconButton: React.FC<{ info: IndexListItemPorps }> = ({
  info,
}) => {
  const matches = useIsmobile()
  const theme = useTheme()
  const [t] = useTranslation()
  const router = useRouter()
  const showPage = router.query.showPage as string
  return (
    <>
      <Tooltip title={`Torrent(${info.torrentcount})`}>
        <span>
          <IconButton
            disabled={+info.torrentcount === 0}
            color="primary"
            onClick={() =>
              router.push(
                router.pathname + '?showPage=torrent',
                router.asPath + '?showPage=torrent'
              )
            }
          >
            <TorrentIcon />
          </IconButton>
        </span>
      </Tooltip>
      <SlideUpDialog
        fullScreen={Boolean(matches)}
        fullWidth={!Boolean(matches)}
        open={showPage === 'torrent'}
        onClose={() => router.back()}
        scroll="paper"
      >
        {matches && (
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => router.back()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography style={{ marginLeft: theme.spacing(2) }} variant="h6">
                Torrent
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {!matches && (
          <DialogTitle style={{ padding: theme.spacing(2, 2, 0) }}>
            Torrent
          </DialogTitle>
        )}
        <List dense={Boolean(matches)}>
          {info.torrents.map((o, k) => (
            <Link href={o.url} target="_blank" key={k} underline="none">
              <ListItem
                onClick={() => router.back()}
                button
                divider={k !== info.torrents.length - 1}
              >
                <ListItemIcon>
                  <TorrentIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={o.name}
                  secondary={
                    <Grid
                      container
                      spacing={1}
                      direction={matches ? 'column' : 'row'}
                    >
                      <Grid item>
                        {t('G.Torrent.Added')}: {o.added}
                      </Grid>
                      <Grid item>
                        {t('G.Torrent.Size')}: {o.fsize}
                      </Grid>
                      <Grid item>
                        {t('G.Torrent.Tsize')}: {o.tsize}
                      </Grid>
                      <Grid item>
                        {t('Download')}: {o.Downloads}
                      </Grid>
                    </Grid>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </SlideUpDialog>
    </>
  )
}

export default TorrentIconButton
