import Image from 'next/image'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import NumberFormat from 'react-number-format'
import {
  MarketABI,
  marketplaceAddress,
} from '../../Contracts/MarketplaceContract'

export default function MarketItem({ title, by }) {
  // export default function MarketItem(props) {

  //   const [isListed, setIsListed] = useState(props.data.get('listed'))

  const { Moralis, user } = useMoralis()
  const [isListed, setIsListed] = useState(false)

  async function contractCallListItem() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contract = new ethers.Contract(
      marketplaceAddress,
      MarketABI,
      web3Provider.getSigner()
    )

    // const price = ethers.utils.parseEther(
    //   props.data.get('recordPrice').toString()
    // )

    contract
      .listToken(
        TokenAddress,
        props.data.get('token_id'),
        props.data.get('recordCount'),
        // props.data.get("recordPrice")
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
    contractCallListItem()
  }

  return (
    <div className="relative m-4 flex h-64 w-64 flex-col rounded-xl bg-white bg-opacity-50 sm:h-96 ">
      <Image
        src={'/items/moralis_front.png'}
        // src={props.data.itemFile}
        width={250}
        height={250}
        className="rounded-t-xl"
      />
      <div className="flex flex-col items-start justify-between">
        <div className="mx-2 mt-4 flex flex-col items-start sm:mx-4">
          <p>{title}</p>
          {/* <p>{props.data.itemTitle}</p> */}
          <p className="text-xs">by {by}</p>
          <div className="my-2 flex flex-col items-start justify-center text-xs">
            <p>Digital Only</p>
            {/* <p>{props.data.categorie}</p> */}
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
        </div>
      </div>
    </div>
  )
}
