import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'

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
            <p className="text-2xl">DISCOVER METAVERSE WEARABLES</p>
            <div className="my-8 flex flex-col items-start space-y-2">
              <p>Marketplace for physical & digital Items.</p>
              <p
                onClick={() => router.push('/matchmaker')}
                className="cursor-pointer hover:text-gray-700 hover:underline"
              >
                Matchmaking between Fashion Brands & 3D Designers.
              </p>
            </div>
          </div>
          <div className="absolute top-48 flex w-full items-center justify-center sm:top-0 sm:justify-end sm:opacity-0">
            <Image src={'/logo.png'} height={100} width={100} />
          </div>
        </div>
        <div className="absolute top-72">
          <div className="mb-8 mt-4 flex w-full flex-col items-center justify-center sm:mt-2">
            <p className="mb-8 text-2xl">Your closet in the metaverse</p>
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
