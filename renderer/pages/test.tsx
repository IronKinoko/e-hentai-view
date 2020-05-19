import React from 'react'
import Layout from 'components/Layout'

import { Page } from 'apis'
export default function test() {
  return (
    <Layout title="test">
      <button
        onClick={() => {
          Page.LoadImg('https://exhentai.org/s/e30bfafcd4/1634639-2')
        }}>
        loadimg
      </button>
    </Layout>
  )
}
