import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import MarketItem from './MarketItem'

const appId = 'wP72LBrtYNByCuvqcXnGZHuwQv6EBNQSUOpgjwio'
const serverUrl = 'https://wacyebyvksfw.usemoralis.com:2053/server'

export default function Marketplace() {
  const {
    Moralis,
    user,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis()

  const [items, setItems] = useState([])

  Moralis.start({ serverUrl, appId })

  // useEffect(() => {
  //   if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
  //   const Item = Moralis.Object.extend('Item')
  //   const query = new Moralis.Query(Item)
  //   // query.notEqualTo('owner', 'notactive')
  //   // query.equalTo("owner", user.get("ethAddress"));

  //   Moralis.Cloud.run('getDownloadTokens', {
  //     token_id: '0x7595656ba326543413e5288e6aAef08b60699A17',
  //   }).then((results) => {
  //     setItems(results)
  //     console.log(results)
  //   })
  // }, [isAuthenticated, isWeb3Enabled, user])

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <nav className="mb-8 flex w-8/12 flex-row items-center justify-evenly space-x-8"></nav>
      <main className="flex w-11/12 flex-row items-center justify-center overflow-x-scroll">
        {/* <div className="mt-10 flex w-9/12 flex-wrap justify-center">
          {items.map((data, index) => (
            <MarketItem data={data} key={index} />
          ))}
        </div> */}
        <MarketItem title={'Moralis T-Shirt'} by={'Moralis'} />
        <MarketItem title={'Glasses'} by={'Yifan Pu'} />
        <MarketItem title={'Heels'} by={'Yifan Pu'} />
        <MarketItem title={'Shirt'} by={'Yifan Pu'} />
        <MarketItem title={'IPFS T-Shirt'} by={'IPFS'} />
      </main>
    </div>
  )
}
