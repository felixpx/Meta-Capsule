import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import Marketplace from '../src/components/Main/Marketplace'
import { ShoppingCartIcon } from '@heroicons/react/outline'

const Home: NextPage = () => {
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
      <main className="relative flex h-screen w-full flex-col">
        <div className="flex w-full flex-row items-center justify-evenly">
          <div className="absolute top-16 flex flex-col items-start justify-center sm:w-9/12">
            <p className="text-2xl">SHOP</p>
            <div className="my-2 flex flex-col items-start space-y-2">
              <p>Browse physical & digital items. </p>
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col">
          <Marketplace />
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
