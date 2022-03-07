import { PencilAltIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import FeaturedArtist from '../src/components/Matchmaker/FeaturedArtist'
import FeaturedArtist1 from '../src/components/Matchmaker/FeaturedArtist1'

const Home: NextPage = () => {
  const router = useRouter()
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
            <p className="text-2xl">MATCHMAKER</p>
            <div className="my-8 flex flex-col items-start space-y-2">
              <p>
                Find 3D Artists to bring your fashion collection to the digital
                world.
              </p>
              <div className="flex flex-row">
                <p>Are you a 3D Artist and looking for work?</p>
                <p className="ml-2 cursor-pointer font-bold underline hover:text-gray-700">
                  Sign Up
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-56 w-full">
          <div className="mb-8 mt-4 flex w-full flex-col items-center justify-center space-y-8 sm:mt-2">
            <p className="mb-4 text-2xl">Featured 3D Artists</p>
            <div className="flex w-full flex-col items-center justify-center xl:flex-row">
              <div
                aria-label="group of cards"
                className="w-full flex-col space-y-8 focus:outline-none lg:flex-row"
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
