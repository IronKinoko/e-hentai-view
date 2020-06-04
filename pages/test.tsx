import React from 'react'
import Layout from 'components/Layout'

import { setting } from 'apis'
import message from 'components/message'
export default function test() {
  return (
    <Layout title="test">
      <button
        onClick={() => {
          setting()
        }}
      >
        setting
      </button>
      <button
        onClick={() => {
          message.info('12')
        }}
      >
        info
      </button>
      <button
        onClick={() => {
          message.success('12')
        }}
      >
        setting
      </button>
      <button
        onClick={() => {
          message.error('2')
        }}
      >
        setting
      </button>
      <button
        onClick={() => {
          message.warning('s')
        }}
      >
        setting
      </button>
    </Layout>
  )
}
