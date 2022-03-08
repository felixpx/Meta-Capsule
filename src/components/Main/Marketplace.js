import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import MarketItem from './MarketItem'

export default function Marketplace() {
  const { Moralis } = useMoralis()
  const [physical, setPhysical] = useState(true)

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <nav className="mb-8 flex w-8/12 flex-row items-center justify-evenly space-x-8">
        <button
          onClick={() => setPhysical(true)}
          className={`m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
            physical ? 'bg-indigo-300' : ''
          }`}
        >
          All
        </button>
        <button
          onClick={() => setPhysical(false)}
          className={`m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1  ${
            !physical ? 'bg-indigo-300' : ''
          }`}
        >
          Digital
        </button>
      </nav>
      <main className="flex w-11/12 flex-row flex-wrap items-center justify-center overflow-x-scroll">
        {/* {physical && data.map((props, index) => {
          <MarketItem props/>
        })} */}
        {/* {!physical && data.map((props, index) => {
          <MarketItem props/>
        })} */}
        <MarketItem />
        <MarketItem />
        <MarketItem />
        <MarketItem />
        <MarketItem />
      </main>
    </div>
  )
}
