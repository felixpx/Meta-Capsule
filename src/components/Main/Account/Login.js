import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Header from '../../TopEnd/Header'
import Navbar from '../../TopEnd/Navbar'

export default function Login() {
  const { authenticate } = useMoralis()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pb-2">
      <Head>
        <title>Meta Capsule</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <header className="sticky top-0 z-50 w-full">
        <Header />
        <Navbar />
      </header>
      <main className="relative flex h-screen w-full flex-col items-center justify-center text-center">
        <div className="flex w-full flex-row justify-center">
          <div className="absolute top-16 flex flex-col items-start justify-center sm:w-9/12">
            <p className="text-2xl">YOU ARE NOT LOGGED IN</p>
          </div>
          <button
            onClick={authenticate}
            className=" fixed top-64 m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 lg:m-4"
          >
            Connect Wallet
          </button>
        </div>
      </main>
    </div>
  )
}
