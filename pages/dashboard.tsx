import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import Login from '../src/components/Main/Account/Login'
import MintItem from '../src/components/Main/Upload/MintItem'
import ProfileInfo from '../src/components/Main/Account/ProfileInfo'

const Home: NextPage = () => {
  const { isAuthenticated, user } = useMoralis()

  const [noUser, setNoUser] = useState(Boolean)
  const [upload, setUpload] = useState(Boolean)
  const [collection, setCollection] = useState(Boolean)
  const [match, setMatch] = useState(Boolean)

  useEffect(() => {
    if (isAuthenticated && user) {
      setNoUser(false)
    } else if (!isAuthenticated) {
      setNoUser(true)
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) return <Login />

  function uploading() {
    setUpload(true)
    setCollection(false)
    setMatch(false)
  }

  function collecting() {
    setUpload(false)
    setCollection(true)
    setMatch(false)
  }
  function matching() {
    setMatch(true)
    setUpload(false)
    setCollection(false)
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
      {!noUser && (
        <div className="fixed top-36 right-12 z-50 w-64 rounded-xl bg-white bg-opacity-30 p-4">
          <ProfileInfo />
        </div>
      )}

      <main className="relative flex h-screen w-full flex-col items-center justify-center text-center">
        <div className="flex w-full flex-row items-center justify-evenly">
          <div className="absolute top-16 flex flex-col items-start justify-center sm:w-9/12">
            <p className="text-2xl">DASHBOARD</p>
            <div className="mt-8 flex flex-row items-center space-x-8 ">
              <button
                className={`m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
                  collection && 'bg-indigo-300'
                }`}
                onClick={collecting}
              >
                Collection
              </button>
              <button
                className={`m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
                  upload && 'bg-indigo-300'
                }`}
                onClick={uploading}
              >
                Upload Items
              </button>
              <button
                className={`m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
                  match && 'bg-indigo-300'
                }`}
                onClick={matching}
              >
                Matches
              </button>
            </div>
          </div>
          {/* <div className="absolute top-36 flex w-full items-center justify-center sm:top-0 sm:justify-end sm:opacity-0">
            <SunIcon className="h-12" />
          </div> */}
        </div>
        <div className="absolute top-44 w-full">
          {upload && (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full flex-row items-center justify-evenly">
                <p className="mb-4 text-2xl">Mint Item</p>
              </div>
              <MintItem />
            </div>
          )}
        </div>
      </main>
      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </div>
  )
}

export default Home
