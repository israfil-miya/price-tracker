import '../styles/globals.css'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { SessionProvider } from 'next-auth/react'
import Script from 'next/script'
import Layout from '../components/Layout'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <meta name="application-name" content="PriceTracker" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PriceTracker" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="none" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="manifest" href="/manifest.json" />

        <link rel="mask-icon" href="/favicon.png" color="#000000" />

        <meta name="theme-color" content="#FFFFFF" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#FFFFFF" />
        <meta
          name="google-site-verification"
          content="N5yaBrkTsit4CReULYsd6t2ZcIOni8qf011JimffZAg"
        />
        <meta name="title" content="Price Tracker" />
        <meta
          name="description"
          content="An amazing price tracker website that tracks the prices of your favourite items from your favourite e-shops like Amazon, Walmart, Target etc. for free of cost!"
        />
        <meta
          name="keywords"
          content="price tracker, track items price, track prices for free, free price tracker, best free price tracker, jubayer ahmed, amazon price tracker, walmart price tracker, nibtendo price tracker, amazon india"
        />
        <meta name="robots" content="index,follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="2 days" />
        <meta name="author" content="Israfil Miya" />

        <title>Price Tracker – An Open Source free Price Tracker website</title>
      </Head>
      <NextNProgress
        color="#4169e1"
        startPosition={0.3}
        stopDelayMs={200}
        height={1.5}
        showOnShallow={true}
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
      />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
