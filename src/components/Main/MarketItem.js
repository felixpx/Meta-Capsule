import Image from 'next/image'
import NumberFormat from 'react-number-format'
import {
  MarketABI,
  marketplaceAddress,
} from '../../Contracts/MarketplaceContract'

// export default function MarketItem({ title, by }) {
export default function MarketItem(props) {
  // async function contractCallPurchase() {
  //   const web3Provider = await Moralis.enableWeb3()
  //   const ethers = Moralis.web3Library
  // const option = { value: (props.data.recordPrice ** 18).toString() };
  // const options = {
  //   value: ethers.utils.parseEther(props.data.recordPrice.toString()),
  // }
  // console.log(options)

  //   const contract = new ethers.Contract(
  //     marketplaceAddress,
  //     MarketABI,
  //     web3Provider.getSigner()
  //   )
  //   contract
  //     .purchaseToken(props.data.listing_id, '1', options)
  //     .then((result) => {
  //       alert('transaction successful')
  //     })
  // }
  // function buyItem() {
  //   console.log(props.data.recordPrice.toString())
  //   contractCallPurchase()
  // }

  return (
    <div className="relative m-4 flex h-64 w-64 flex-col rounded-xl bg-white bg-opacity-50 sm:h-96 ">
      <Image
        // src={'/items/moralis_front.png'}
        src={props.data.metadataURI}
        width={250}
        height={250}
        className="rounded-t-xl"
      />
      <div className="flex flex-col items-start justify-between">
        <div className="mx-2 mt-4 flex flex-col items-start sm:mx-4">
          {/* <p>{title}</p> */}
          <p>{props.data.itemTitle}</p>
          <p className="text-xs">by {props.data.itemDescription}</p>
          <div className="my-2 flex flex-col items-start justify-center text-xs">
            {/* <p>Digital Only</p> */}
            <p>{props.data.category}</p>
          </div>
        </div>
        <div className="absolute bottom-4 flex w-full flex-row items-center justify-evenly text-xs ">
          <div className="rounded-lg border-2 border-gray-800 p-1 px-2">
            <NumberFormat
              // value={'7'}
              value={props.data.pricePerItem}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'MATIC '}
            />
          </div>
          <button
            onClick={buyItem}
            className={`whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1`}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}
