import React from 'react'
import Head from 'next/head'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AppProps } from 'next/app'
import ThemeProvider from 'src/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Router from 'next/router'
import moment from 'moment'
moment.locale('zh-cn')
Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  console.log(url)
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
  document.scrollingElement?.scroll({ left: 0, top: 0, behavior: 'smooth' })
})
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <style jsx global>
          {`
            a {
              text-decoration: none;
              color: unset;
            }
          `}
        </style>
      </ThemeProvider>
    </React.Fragment>
  )
}
