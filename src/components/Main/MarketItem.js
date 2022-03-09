import Image from 'next/image'
import NumberFormat from 'react-number-format'

export default function MarketItem({ title, by }) {
  function buyItem() {
    alert('item bought')

    // contractCall
  }
  return (
    <div className="relative m-4 flex h-64 w-64 flex-col rounded-xl bg-white bg-opacity-50 sm:h-96 ">
      <Image
        src={'/items/moralis_front.png'}
        width={250}
        height={250}
        className="rounded-t-xl"
      />
      <div className="flex flex-col items-start justify-between">
        <div className="mx-2 mt-4 flex flex-col items-start sm:mx-4">
          <p>{title}</p>
          <p className="text-xs">by {by}</p>
          <div className="my-2 flex flex-col items-start justify-center text-xs">
            <p>Digital Only</p>
          </div>
        </div>
        <div className="absolute bottom-4 flex w-full flex-row items-center justify-evenly text-xs ">
          <div className="rounded-lg border-2 border-gray-800 p-1 px-2">
            <NumberFormat
              value={'7'}
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
