import { ClipboardCopyIcon, UserIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import Login from '../src/components/Main/Account/Login'
import ProfileInfo from '../src/components/Main/Account/ProfileInfo'

const Home: NextPage = () => {
  const router = useRouter()
  const { switchNetwork } = useChain()

  const {
    isAuthenticated,
    user,
    chainId,
    setUserData,
    isUserUpdating,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis()

  const [walletAddress, setWalletAddress] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [website, setWebsite] = useState()
  const [wrongNetwork, setWrongNetwork] = useState(Boolean)
  const [changeUser, setChangeUser] = useState(false)

  useEffect(() => {
    if (isWeb3Enabled) enableWeb3()
    if (isAuthenticated && chainId != null) {
      if (user) {
        setUsername(user.get('username'))
        setWalletAddress(user.get('ethAddress'))
        setWrongNetwork(false)
      }
    } else if (isAuthenticated && chainId != '0x13881') {
      if (user) {
        setUsername(user.get('username'))
        setWalletAddress(user.get('ethAddress'))
      }
      setWrongNetwork(true)
    } else {
    }
  }, [user, isAuthenticated, chainId])

  const setUser = async () => {
    const username = (document.getElementById('username') as HTMLInputElement)
      .value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const website = (document.getElementById('website') as HTMLInputElement)
      .value
    await setUserData({
      username: username,
      email: email,
      website: website,
    })
    setChangeUser(false)
  }

  if (!isAuthenticated) return <Login />

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
            <ProfileInfo />
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
