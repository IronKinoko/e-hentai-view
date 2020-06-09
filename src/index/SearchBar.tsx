import React, { useRef, useState, useEffect } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Container, Grid, Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import message from 'components/message'
import useFocus from 'hooks/useFocus'
import clsx from 'clsx'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { position: 'relative', overflow: 'hidden' },

    searchRoot: {
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

      transition: theme.transitions.create('width'),
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
    inputFocus: { width: 'calc(100% - 80px)' },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },

    searchButton: {
      position: 'absolute',
      right: -72,
      transition: theme.transitions.create('right'),
    },
    btnShow: {
      right: 0,
    },
  })
)

const SearchBar: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const f_search = decodeURIComponent((router.query.f_search as string) || '')
  const [search, setSearch] = useState(f_search)
  const [isFocus, ref] = useFocus<HTMLInputElement>()
  useEffect(() => {
    setSearch(f_search)
  }, [f_search])

  const onSearch = () => {
    if (search.length < 3 && search.length > 0)
      return message.error(
        'The search string is too short, and was ignored.',
        1500
      )
    router.push(`/?f_search=${search}`, undefined, {
      shallow: true,
    })
  }

  return (
    <Container maxWidth="sm" disableGutters>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSearch()
            }}
            className={clsx(classes.searchRoot, {
              [classes.inputFocus]: isFocus,
            })}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={search}
              inputRef={ref}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </form>
        </Grid>
        <Button
          className={clsx(classes.searchButton, { [classes.btnShow]: isFocus })}
          onClick={onSearch}
        >
          Search
        </Button>
      </Grid>
    </Container>
  )
}

export default SearchBar
