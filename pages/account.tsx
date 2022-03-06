import {
  ClipboardCopyIcon,
  PencilAltIcon,
  UserIcon,
} from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'

const Home: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated, user, chainId } = useMoralis()

  const [walletAddress, setWalletAddress] = useState('')
  const [username, setUsername] = useState('')
  const [wrongNetwork, setWrongNetwork] = useState(Boolean)

  useEffect(() => {
    if (isAuthenticated && chainId != null) {
      if (user) {
        setUsername(user.get('username'))
        setWalletAddress(user.get('ethAddress'))
      }
    } else if (isAuthenticated && chainId != '0x13881') {
      if (user) {
        setUsername(user.get('username'))
        setWalletAddress(user.get('ethAddress'))
      }
      setWrongNetwork(true)
    } else {
    }
  }, [])

  function changeUsername() {
    //execute change username
    alert('change user')
  }
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
        <div className="flex w-full flex-row items-center justify-evenly">
          <div className="absolute top-16 flex flex-col items-start justify-center sm:w-9/12">
            <p className="text-2xl">ACCOUNT DETAILS</p>
            <div className="my-8 flex flex-col items-start space-y-2">
              {/* <p>{username}</p> */}
              <div
                className="flex cursor-pointer flex-row hover:text-indigo-600 active:text-[#f5f5f5]"
                onClick={changeUsername}
              >
                <p>{username}</p>
                <PencilAltIcon className="h-3" />
              </div>
              <div
                className="flex cursor-pointer flex-row hover:text-indigo-600 active:text-[#f5f5f5]"
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress)
                }}
              >
                <p>{walletAddress}</p>
                <ClipboardCopyIcon className="h-3" />
              </div>
            </div>
          </div>
          <div className="absolute top-52 flex w-full items-center justify-center sm:top-0 sm:justify-end sm:opacity-0">
            <UserIcon className="h-12" />
          </div>
        </div>
        <div className="absolute top-72">
          <div className="mb-8 flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-row items-center justify-evenly">
              <p className="mb-8 text-2xl underline">Your Collection</p>
              <p className="mb-8 text-2xl underline">Matches</p>
            </div>
            <Image src={'/hero.png'} height={400} width={800} />
          </div>
        </div>
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
