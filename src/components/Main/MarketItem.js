import Image from 'next/image'
import NumberFormat from 'react-number-format'

export default function MarketItem() {
  function buyItem() {
    alert('item bought')

    // contractCall
  }
  return (
    <div className="m-4 flex h-64 w-64 flex-col rounded-xl bg-[#f5f5f5] sm:h-96 ">
      <Image
        src={'/items/glasses_front.png'}
        width={250}
        height={250}
        className="rounded-t-xl"
      />
      <div className="mx-2 mt-4 flex flex-col items-start sm:mx-4">
        <p>Moralis T-Shirt</p>
        <p>by {'Moralis'}</p>
      </div>
      <div className="mt-4 flex w-full flex-row items-center justify-evenly">
        {/* <NumberFormat
          //   value={props.amount}
          value={'50'}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$ '}
        /> */}
        <NumberFormat
          //   value={props.amount}
          value={'7'}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'MATIC '}
        />
        <button
          onClick={buyItem}
          className={`m-1 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1`}
        >
          Buy
        </button>
      </div>
    </div>
  )
}
