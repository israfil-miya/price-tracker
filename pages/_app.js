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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Price Tracker" />
        <meta
          name="description"
          content="An amazing website that can track the prices of your favourite items from your favourite e-shops like Amazon, Walmart, Target etc. for free of cost!"
        />
        <meta
          name="keywords"
          content="price, tracker, track, items, price, track, prices, for, free, free, price, tracker, best, free, price, tracker, jubayer, ahmed"
        />
        <meta name="robots" content="index,follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="2 days" />
        <meta name="author" content="Israfil Miya" />
        <link rel="shortcut icon" href="/favicon.png" />
        <title>
          Price Tracker – Start tracking your favourite products from now!
        </title>
      </Head>
      <NextNProgress
        color="rgb(238,61,0)"
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
