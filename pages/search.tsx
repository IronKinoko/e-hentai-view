import { LOCAL_SEARCH_HISTORY } from '@/constant'
import useEnhanceLocalStorageState from '@/hooks/useEnhanceLocalStorageState'
import {
  AppBar,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Zoom,
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import HistoryIcon from '@mui/icons-material/History'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

const useStyles = makeStyles(() =>
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
      [query, ...searchHistories.filter((v) => v !== query)].slice(0, 50)
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
        return router.replace('/[gid]/[token]', `/${gid}/${token}`)
      }
    } catch (error) {}
    router.replace('/result?f_search=' + encodeURIComponent(f_search))
  }

  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar>
          <IconButton onClick={() => router.back()} edge="start" size="large">
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
              size="large"
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
                size="large"
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
