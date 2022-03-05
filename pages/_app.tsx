import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { MoralisDappProvider } from '../src/providers/MoralisDappProvider/MoralisDappProvider'

const APP_ID = 'wP72LBrtYNByCuvqcXnGZHuwQv6EBNQSUOpgjwio'
const SERVER_URL = 'https://wacyebyvksfw.usemoralis.com:2053/server'

function MyApp({ Component, pageProps }: AppProps) {
  const isServerInfo = APP_ID && SERVER_URL ? true : false
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
    )
  if (isServerInfo)
    return (
      <MoralisProvider
        appId={APP_ID}
        serverUrl={SERVER_URL}
        initializeOnMount={true}
      >
        <MoralisDappProvider>
          {/* <App isServerInfo /> */}
          <Component isServerInfo {...pageProps} />
        </MoralisDappProvider>
      </MoralisProvider>
    )
}

export default MyApp
