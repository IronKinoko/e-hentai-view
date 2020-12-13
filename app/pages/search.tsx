import React, { useState, useRef, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  NoSsr,
  Zoom,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useTranslation, Router } from 'i18n'
import { useRouter } from 'next/router'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import HistoryIcon from '@material-ui/icons/History'
import { useLocalStorageState } from '@umijs/hooks'
import { LOCAL_SEARCH_HISTORY } from 'constant'
import useEnhanceLocalStorageState from 'hooks/useEnhanceLocalStorageState'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formroot: {
      flex: 1,
    },
    input: {
      fontSize: '1.25rem',
      width: '100%',
      '& ::-webkit-search-cancel-button': {
        '-webkit-appearance': 'none',
      },
    },
    inputEndIcon: {
      fontSize: 24,
      color: 'inherit',
    },
  })
)

const Search = () => {
  const [t] = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [searchHistories, setSearchHistories] = useEnhanceLocalStorageState<
    string[]
  >(LOCAL_SEARCH_HISTORY, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.length === 0) return

    setSearchHistories(
      [query, ...searchHistories.filter((v) => v != query)].slice(0, 50)
    )

    handleGoResult(query)
  }

  const handleGoResult = (f_search: string) => {
    try {
      if (f_search.includes('exhentai.org/g/')) {
        let res = f_search.split('/')
        let gIndex = res.findIndex((v) => v === 'g')
        let gid = res[gIndex + 1]
        let token = res[gIndex + 2]
        return Router.replace('/[gid]/[token]', `/${gid}/${token}`)
      }
    } catch (error) {}
    Router.replace('/result?f_search=' + encodeURIComponent(f_search))
  }

  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar>
          <IconButton onClick={() => Router.back()} edge="start">
            <ArrowBackIcon />
          </IconButton>
          <form
            action="/"
            onSubmit={handleSubmit}
            method="GET"
            className={classes.formroot}
          >
            <InputBase
              placeholder={t('Search')}
              value={query}
              name="f_search"
              autoFocus
              inputProps={{
                maxLength: 2000,
                minLength: 3,
                autoCorrect: 'off',
                autoCapitalize: 'off',
                spellCheck: false,
              }}
              inputRef={ref}
              onChange={(e) => setQuery(e.target.value)}
              className={classes.input}
              type="search"
            />
          </form>
          <Zoom in={query.length > 0}>
            <IconButton
              edge="end"
              onClick={() => {
                setQuery('')
                ref.current?.focus()
              }}
              className={classes.inputEndIcon}
            >
              <CloseIcon />
            </IconButton>
          </Zoom>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <List>
        {searchHistories.map((o, k) => (
          <ListItem button key={k} onClick={() => handleGoResult(o)}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={o} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  searchHistories.splice(k, 1)
                  setSearchHistories([...searchHistories])
                }}
              >
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Search
