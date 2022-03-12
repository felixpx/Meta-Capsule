import Image from 'next/image'
import { useMoralis } from 'react-moralis'
import NumberFormat from 'react-number-format'
import {
  MarketABI,
  marketplaceAddress,
} from '../../Contracts/MarketplaceContract'

export default function MarketItem(props) {
  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis()
  async function contractCallPurchase() {
    console.log('buying')
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library
    const options = {
      value: ethers.utils.parseEther(props.data.get('pricePerItem').toString()),
    }
    console.log(options)

    const contract = new ethers.Contract(
      marketplaceAddress,
      MarketABI,
      web3Provider.getSigner()
    )
    contract
      .purchaseToken(props.data.get('token_id'), '1', options)
      .then((result) => {
        alert('transaction successful')
      })
  }
  function buyItem() {
    if (isWeb3Enabled && isAuthenticated) contractCallPurchase()
    else alert('not logged in')
  }

  return (
    <div className="relative m-4 flex h-64 w-64 flex-col rounded-xl bg-white bg-opacity-50 sm:h-96 ">
      <Image
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
          <div className="rounded-lg border-2 border-gray-800 p-1 px-2">
            <NumberFormat
              value={props.data.get('pricePerItem')}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'USDC '}
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
