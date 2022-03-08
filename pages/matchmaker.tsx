import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import FeaturedArtist from '../src/components/Matchmaker/FeaturedArtist'
import ArtistInfo from '../src/components/Matchmaker/ArtistInfo'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { XIcon } from '@heroicons/react/outline'
import ProfileInfo from '../src/components/Main/Account/ProfileInfo'

const Home: NextPage = () => {
  const { isAuthenticated, authenticate, Moralis, user } = useMoralis()

  const [signup, setSignup] = useState(false)
  const [signupFirst, setSignupFirst] = useState(false)
  const [noUser, setNoUser] = useState(Boolean)

  function signUpArtist() {
    if (!isAuthenticated) {
      setSignupFirst(true)
    } else if (isAuthenticated) {
      setSignup(true)
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      setSignupFirst(false)
      setNoUser(false)
    } else if (!isAuthenticated) {
      setNoUser(true)
    }
  }, [isAuthenticated, user])

  function signInwithMeta() {
    authenticate()
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
      {signupFirst && (
        <div className="fixed z-50 flex h-screen w-full justify-center  bg-white bg-opacity-80 ">
          <div className="absolute top-0 flex h-screen w-full flex-col items-center bg-white bg-opacity-30">
            <p className="mt-24 text-xl">Not logged in!</p>
            <button
              onClick={signInwithMeta}
              className="m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 lg:m-4"
            >
              Connect Wallet
            </button>
            <button
              className="whitespace-nowrap rounded-lg border-2 border-gray-800 px-2"
              onClick={() => setSignupFirst(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <main className="relative flex h-screen w-full flex-col items-center justify-center text-center">
        <div className="flex h-screen w-full flex-row items-center justify-evenly ">
          {signup && (
            <div className="fixed z-50 flex h-screen w-full justify-center  bg-white bg-opacity-80 ">
              <div className="flex h-max w-4/12 flex-col items-center justify-center border-x-2 border-b-2 border-indigo-100 bg-gray-800  shadow-2xl">
                <ArtistInfo />
                <button
                  className="mt-2 mb-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
                  onClick={() => setSignup(false)}
                >
                  <XIcon className="h-5" />
                </button>
              </div>
            </div>
          )}
          <div className="absolute top-16 flex flex-col items-start justify-center sm:w-9/12">
            <p className="text-2xl">MATCHMAKER</p>
            <div className="my-8 flex flex-col items-start space-y-2">
              <p>
                Find 3D Artists to bring your fashion collection to the digital
                world.
              </p>
              <div className="flex w-full flex-row">
                <p>Are you a 3D Artist and looking for work?</p>
                <p
                  className="ml-2 cursor-pointer font-bold underline hover:text-gray-700"
                  onClick={signUpArtist}
                >
                  Sign Up
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-48 w-full items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center space-y-8 sm:mt-2">
            <p className="mb-4 text-2xl">Featured 3D Artists</p>
            <div className="flex w-full flex-row items-center justify-center">
              <div
                aria-label="group of cards"
                className="flex w-full flex-col items-center justify-between space-y-4 focus:outline-none"
              >
                <FeaturedArtist />
                <FeaturedArtist />
              </div>
            </div>
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
