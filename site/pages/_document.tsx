/* eslint-disable @next/next/no-sync-scripts */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth' }}>
        <Head />
        <body className="loading">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N34PR65K"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
