import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import ComissionTab from '../src/components/HeadlessUI/ComissionTab'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pb-2">
      <Head>
        <title>Meta Capsule Comission</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <div className="absolute top-0 w-full">
        <Header />
        <Navbar />
      </div>
      <main className="flex h-max w-full flex-col items-center px-20 pt-36 text-center">
        <p>Who are you?</p>
        <ComissionTab />
        <ComissionTab />
        <ComissionTab />
        <ComissionTab />
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
