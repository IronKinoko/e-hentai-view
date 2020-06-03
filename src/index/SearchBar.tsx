import React, { useRef } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(
        theme.palette.type === 'light'
          ? theme.palette.grey['700']
          : theme.palette.common.white,
        0.15
      ),
      '&:hover': {
        backgroundColor: fade(
          theme.palette.type === 'light'
            ? theme.palette.grey['700']
            : theme.palette.common.white,
          0.25
        ),
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

      transition: theme.transitions.create('width'),
    },
  })
)

interface SearchBarPorps {
  value: string
  onChange: (v: string) => void
  onSearch?: () => void
}
const SearchBar: React.FC<SearchBarPorps> = ({ value, onChange, onSearch }) => {
  const classes = useStyles()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.()
      }}
      className={classes.search}
    >
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </form>
  )
}

export default SearchBar
