import Image from 'next/image'
import NumberFormat from 'react-number-format'

export default function MarketItem() {
  return (
    <div className="m-4 flex h-48 w-48 flex-col rounded-xl bg-[#f5f5f5] sm:h-96 sm:w-72">
      <Image
        src={'/light0green1.png'}
        width={500}
        height={500}
        className="rounded-t-xl"
      />
      {/* <div className="mx-2 flex flex-col items-start sm:mx-4">
        <p>Moralis T-Shirt</p>
        <p>by {'Moralis'}</p>
      </div>
      <div className="flex w-full flex-row items-center justify-evenly">
        <NumberFormat
          //   value={props.amount}
          value={'50'}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$ '}
        />
        <NumberFormat
          //   value={props.amount}
          value={'7'}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'MATIC '}
        />
      </div> */}
    </div>
  )
}
