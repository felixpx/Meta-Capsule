import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import ProfileInfo from '../src/components/Main/Account/ProfileInfo'
import Marketplace from '../src/components/Main/Marketplace'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'

const Home: NextPage = () => {
  const router = useRouter()

  const { isAuthenticated, user } = useMoralis()

  const [noUser, setNoUser] = useState(Boolean)

  useEffect(() => {
    if (isAuthenticated && user) {
      setNoUser(false)
    } else if (!isAuthenticated) {
      setNoUser(true)
    }
  }, [isAuthenticated, user])

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
          {/* <div className="absolute top-48 flex w-full items-center justify-center sm:top-0 sm:justify-end sm:opacity-0">
            <Image src={'/logo.png'} height={100} width={100} />
          </div> */}
        </div>
        <div className="absolute top-52">
          <div className="flex w-full flex-col items-center justify-center sm:mt-2">
            <p className="mb-4 text-2xl">Shop Items</p>
            <div className="flex flex-col">
              <Marketplace />
            </div>
            {/* <Image src={'/hero.png'} height={400} width={800} /> */}
          </div>
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
