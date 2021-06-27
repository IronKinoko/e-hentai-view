import useIsIosStandalone from '@/hooks/useIsIosStandalone'
import ComicConfig from '@/widgets/comic/ComicConfig'
import CssBaseline from '@material-ui/core/CssBaseline'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React from 'react'
import ThemeProvider from 'src/theme'
import { SWRConfig } from 'swr'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  console.log(url)
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const matches = useIsIosStandalone()
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          function (err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>EhentaiView</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
      </Head>

      <SWRConfig value={{ errorRetryInterval: 1000, errorRetryCount: 1 }}>
        <ComicConfig>
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
        </ComicConfig>
      </SWRConfig>
    </React.Fragment>
  )
}

export default appWithTranslation(MyApp)
