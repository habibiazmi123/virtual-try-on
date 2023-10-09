import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import '../styles/App.css'
// import "../styles/handsplaceholder.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
