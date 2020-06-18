import React, { useState } from 'react'
import {
  Tooltip,
  IconButton,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
  Grid,
} from '@material-ui/core'
import TorrentIcon from 'components/TorrentIcon'
import { IndexListItemPorps } from 'interface/gallery'
import SlideUpDialog from 'components/SlideUpDialog'
import { useIsmobile } from '@/theme'
import { useTranslation } from 'i18n'

const TorrentIconButton: React.FC<{ info: IndexListItemPorps }> = ({
  info,
}) => {
  const [open, setOpen] = useState(false)
  const matches = useIsmobile()
  const [t] = useTranslation()
  return (
    <>
      <Tooltip title={`Torrent(${info.torrentcount})`}>
        <span>
          <IconButton
            disabled={+info.torrentcount === 0}
            color="primary"
            onClick={() => setOpen(true)}
          >
            <TorrentIcon />
          </IconButton>
        </span>
      </Tooltip>
      <SlideUpDialog fullWidth open={open} onClose={() => setOpen(false)}>
        <List dense={Boolean(matches)}>
          {info.torrents.map((o, k) => (
            <ListItem
              onClick={() => {
                window.open(o.url)
              }}
              button
              key={k}
              divider={k !== info.torrents.length - 1}
            >
              <ListItemIcon>
                <TorrentIcon />
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
                  </Grid>
                }
                secondaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
          ))}
        </List>
      </SlideUpDialog>
    </>
  )
}

export default TorrentIconButton
