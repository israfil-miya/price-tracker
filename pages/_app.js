import '../styles/globals.css'
import Head from "next/head";
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from "next-auth/react"
import Script from 'next/script'
import Layout from "../components/Layout"

export default function MyApp( {
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous" />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.png"/>
      <title>Price Tracker</title>
    </Head>
    <NextNProgress color="rgb(238,61,0)"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true} options={{ easing: 'ease', speed: 500, showSpinner: false }}/>
      <SessionProvider session={session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </>
  );
}