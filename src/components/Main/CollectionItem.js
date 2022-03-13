import Image from 'next/image'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import NumberFormat from 'react-number-format'
import { MintABI, mintAddress } from '../../Contracts/MintContract'
import {
  MarketABI,
  marketplaceAddress,
} from '../../Contracts/MarketplaceContract'

export default function CollectionItem(props) {
  // export default function MarketItem(props) {

  //   const [isListed, setIsListed] = useState(props.data.get('listed'))

  const { Moralis, user, isAuthenticated } = useMoralis()
  const [isListed, setIsListed] = useState()

  async function contractCallListItem() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contract = new ethers.Contract(
      marketplaceAddress,
      MarketABI,
      web3Provider.getSigner()
    )

    console.log(web3Provider.getSigner())
    console.log(props.data.get('pricePerItem'))
    console.log(props.data.get('numberOfItems'))

    const price = ethers.utils.parseUnits(props.data.get('pricePerItem'), 6)

    contract
      .listToken(
        mintAddress,
        props.data.get('tokenId'),
        props.data.get('numberOfItems'),
        price
      )
      .then((result) => {
        props.data.set('listed', true)
        props.data.save()
        alert('successfully listed on the marketplace.')
        setIsListed(true)
      })
  }

  function listItem() {
    if (user && isAuthenticated) contractCallListItem()
  }

  return (
    <div className="relative m-4 flex h-64 w-64 flex-col rounded-xl bg-white bg-opacity-50 sm:h-96 ">
      <Image
        // src={'/items/moralis_front.png'}
        src={props.data.get('itemFile')}
        width={250}
        height={250}
        className="rounded-t-xl"
      />
      <div className="flex flex-col items-start justify-between">
        <div className="mx-2 mt-4 flex flex-col items-start sm:mx-4">
          <p>{props.data.get('itemTitle')}</p>
          <p className="text-xs">by {props.data.get('itemDescription')}</p>
          <div className="my-2 flex flex-col items-start justify-center text-xs">
            {/* <p>Digital Only</p> */}
            {/* <p>{props.data.get('category')}</p> */}
          </div>
        </div>
        <div className="absolute bottom-4 flex w-full flex-row items-center justify-evenly text-xs ">
          {/* <div className="rounded-lg border-2 border-gray-800 p-1 px-2">
            <NumberFormat
              value={'7'}
              // value={props.data.pricePerItem}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'MATIC '}
            />
          </div> */}
          {!isListed && (
            <button
              onClick={listItem}
              className={`whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1`}
            >
              List
            </button>
          )}
          {isListed && (
            <div
              className={`whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1`}
            >
              Listed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
