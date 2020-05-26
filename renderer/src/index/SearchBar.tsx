import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CancelIcon from '@material-ui/icons/Cancel'
import { IconButton } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import clsx from 'clsx'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'inherit',
    },
    cancelIcon: {
      right: 0,
      top: 0,
      color: theme.palette.grey[500],
      zIndex: 1,
    },
    iconButton: { pointerEvents: 'initial' },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
    },
  })
)

interface SearchBarPorps {
  value: string
  onChange: (v: string) => void
}
const SearchBar: React.FC<SearchBarPorps> = ({ value, onChange }) => {
  const classes = useStyles()
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <div className={clsx(classes.searchIcon, classes.cancelIcon)}>
        <Zoom in={value !== ''} timeout={150}>
          <IconButton
            className={classes.iconButton}
            size="small"
            onClick={() => onChange('')}
          >
            <CancelIcon />
          </IconButton>
        </Zoom>
      </div>
    </div>
  )
}

export default SearchBar
