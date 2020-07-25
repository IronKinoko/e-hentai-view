import React from 'react'
import Head from 'next/head'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AppProps } from 'next/app'
import ThemeProvider from 'src/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Router from 'next/router'
import moment from 'moment'
import { SWRConfig } from 'swr'
import { i18n, appWithTranslation } from 'i18n'
import useIsIosStandalone from 'hooks/useIsIosStandalone'
moment.locale('zh-cn')
Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  console.log(url)
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

init()
function init() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('i18n') !== null) {
      i18n.changeLanguage(localStorage.getItem('i18n')!)
    } else {
      if (navigator.language.startsWith('zh')) {
        i18n.changeLanguage('zh')
      } else {
        i18n.changeLanguage('en')
      }
    }
    document.querySelector('html')?.setAttribute('lang', navigator.language)
  }
}

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const matches = useIsIosStandalone()
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>EhentaiView</title>
      </Head>

      <SWRConfig value={{ errorRetryInterval: 100 }}>
        <ThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
          <style jsx global>
            {`
              a {
                text-decoration: none;
                color: unset;
              }
              body {
                padding-bottom: ${matches
                  ? '30px'
                  : 'env(safe-area-inset-bottom)'};
              }
            `}
          </style>
        </ThemeProvider>
      </SWRConfig>
    </React.Fragment>
  )
}

export default appWithTranslation(MyApp)
