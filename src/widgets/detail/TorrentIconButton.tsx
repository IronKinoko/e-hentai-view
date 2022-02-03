import LoadingIconButton from '@/components/LoadingButton'
import SlideUpDialog from '@/components/SlideUpDialog'
import TorrentIcon from '@/components/TorrentIcon'
import useTorrent from '@/hooks/useTorrent'
import { IndexListItemPorps } from '@/interface/gallery'
import { useIsmobile } from '@/theme'
import {
  AppBar,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'

const TorrentIconButton: React.FC<{ info: IndexListItemPorps }> = ({
  info,
}) => {
  const matches = useIsmobile()
  const theme = useTheme()
  const [t] = useTranslation()
  const router = useRouter()
  const showPage = router.query.showPage as string

  const { data } = useTorrent(`${info.gid}/${info.token}`)

  return (
    <>
      <Tooltip title={`Torrent(${info.torrentcount})`}>
        <span>
          <LoadingIconButton
            loading={!data}
            disabled={!data || +info.torrentcount === 0}
            color="primary"
            onClick={() =>
              router.push(
                '/[gid]/[token]?showPage=torrent',
                `/${info.gid}/${info.token}?showPage=torrent`
              )
            }
          >
            <TorrentIcon />
          </LoadingIconButton>
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
                size="large"
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
          {data?.map((o, k) => (
            <Link href={o.url} target="_blank" key={k} underline="none">
              <ListItem
                onClick={() => router.back()}
                button
                divider={k !== +info.torrentcount - 1}
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
                        {t('G.Torrent.Added')}:{' '}
                        {dayjs(o.posted).format('YYYY-MM-DD HH:mm')}
                      </Grid>
                      <Grid item>
                        {t('G.Torrent.Size')}: {o.size}
                      </Grid>
                      <Grid item>
                        {t('Download')}: {o.downloads}
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
