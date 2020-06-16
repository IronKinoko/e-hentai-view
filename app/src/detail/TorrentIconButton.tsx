import React, { useState } from 'react'
import {
  Tooltip,
  IconButton,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
} from '@material-ui/core'
import TorrentIcon from 'components/TorrentIcon'
import { IndexListItemPorps } from 'interface/gallery'
import SlideUpDialog from 'components/SlideUpDialog'
import { useIsmobile } from '@/theme'

const TorrentIconButton: React.FC<{ info: IndexListItemPorps }> = ({
  info,
}) => {
  const [open, setOpen] = useState(false)
  const matches = useIsmobile()
  return (
    <>
      <Tooltip title={`Torrent(${info.torrentcount})`}>
        <IconButton
          disabled={+info.torrentcount === 0}
          color="primary"
          onClick={() => setOpen(true)}
        >
          <TorrentIcon />
        </IconButton>
      </Tooltip>
      <SlideUpDialog fullWidth open={open} onClose={() => setOpen(false)}>
        <List dense={Boolean(matches)}>
          {info.torrents.map((o, k) => (
            <ListItem button key={k} divider={k !== info.torrents.length - 1}>
              <ListItemIcon>
                <TorrentIcon />
              </ListItemIcon>
              <ListItemText primary={o.name} />
            </ListItem>
          ))}
        </List>
      </SlideUpDialog>
    </>
  )
}

export default TorrentIconButton
