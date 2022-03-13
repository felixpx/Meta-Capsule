// import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Header from '../src/components/TopEnd/Header'
import Navbar from '../src/components/TopEnd/Navbar'
import Login from '../src/components/Main/Account/Login'
import MintItem from '../src/components/Main/Upload/MintItem'
import LiveEscrow from '../src/components/Matchmaker/LiveEscrow'
import ProfileInfo from '../src/components/Main/Account/ProfileInfo'
import CollectionItem from '../src/components/Main/CollectionItem'

const appId = 'wP72LBrtYNByCuvqcXnGZHuwQv6EBNQSUOpgjwio'
const serverUrl = 'https://wacyebyvksfw.usemoralis.com:2053/server'

const Home = () => {
  const {
    Moralis,
    user,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis()

  const [items, setItems] = useState([])
  const [escrows, setEscrows] = useState([])

  Moralis.start({ serverUrl, appId })

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    if (user) {
      const Item = Moralis.Object.extend('Item')
      const query = new Moralis.Query(Item)
      // query.notEqualTo('owner', 'notactive')
      query.equalTo('owner', user.get('ethAddress'))

      query.find().then((results) => {
        let result = []
        results.forEach((item) => {
          result.push(item)
        })
        setItems(result)
        console.log(results)
      })
    }
  }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, user, enableWeb3])

  // 3d Artist
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    if (user) {
      const Escrow = Moralis.Object.extend('Escrow')
      const query = new Moralis.Query(Escrow)
      query.equalTo('active', true)
      query.equalTo('projectArtist', user.get('ethAddress'))

      query.find().then((results) => {
        let result = []
        results.forEach((escrow) => {
          result.push(escrow)
        })
        setEscrows(result)
        console.log(results)
      })
    }
  }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, user, enableWeb3])

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    if (user) {
      const Escrow = Moralis.Object.extend('Escrow')
      const query = new Moralis.Query(Escrow)
      query.equalTo('active', true)
      query.equalTo('projectBrand', user.get('ethAddress'))

      query.find().then((results) => {
        let result = []
        results.forEach((escrow) => {
          result.push(escrow)
        })
        setEscrows(result)
        console.log(results)
      })
    }
  }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, user, enableWeb3])

  const [noUser, setNoUser] = useState(Boolean)
  const [upload, setUpload] = useState(Boolean)
  const [collection, setCollection] = useState(true)
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
                Escrow
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-44 w-full">
          {upload && (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full flex-row items-center justify-evenly">
                <p className="mb-8 text-2xl">MINT</p>
              </div>
              <MintItem />
            </div>
          )}
          {match && (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full flex-row items-center justify-evenly">
                <p className="mb-4 text-2xl">LIVE ESCROWS</p>
              </div>
              {/* map through escrows */}
              {escrows.map((data, index) => (
                <LiveEscrow data={data} key={index} />
              ))}
            </div>
          )}
          {collection && (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full flex-row items-center justify-evenly">
                <p className="mb-4 text-2xl">COLLECTION</p>
              </div>
              {items.map((data, index) => (
                <CollectionItem data={data} key={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
