import { useChain, useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const { switchNetwork } = useChain()
  const {
    isAuthenticated,
    logout,
    isWeb3Enabled,
    chainId,
    authenticate,
    enableWeb3,
    Moralis,
  } = useMoralis()

  // const [isConnected, setIsConnected] = useState()

  // const userConnect = async () => {
  //   await Moralis.authenticate({
  //     provider: 'walletconnect',
  //     chainId: 80001,
  //   })
  //   setIsConnected(true)
  // }

  // const userDisconnect = async () => {
  //   logout()
  //   setIsConnected(false)
  // }

  const [wrongNetwork, setWrongNetwork] = useState('')

  // MUMBAI 0x13881
  // POLYGON MAIN 0x89

  useEffect(() => {
    if (isWeb3Enabled) enableWeb3()
    if (isAuthenticated && chainId != null) {
      if (chainId == '0x13881') {
        setWrongNetwork(false)
      } else if (chainId != '0x13881') {
        setWrongNetwork(true)
      }
    }
  }, [isAuthenticated, chainId])

  function correctNetwork() {
    switchNetwork('0x13881')
  }

  return (
    <header className="relative flex w-full">
      <div className="sticky flex h-auto w-full flex-col items-center justify-between overflow-hidden bg-[#f5f5f5] sm:flex-row">
        <h1 className="m-2 whitespace-nowrap text-xl text-black sm:m-4 lg:m-4">
          <Image src={'/blk.png'} width={200} height={50} />
        </h1>
        <div className="text-gray-800">
          {isAuthenticated && wrongNetwork ? (
            <button
              onClick={correctNetwork}
              className="m-2 whitespace-nowrap rounded-lg border-2 border-red-500 px-2 py-1 text-red-500 lg:m-4"
            >
              Switch Network
            </button>
          ) : isAuthenticated ? (
            <button
              onClick={logout}
              className="m-2 whitespace-nowrap rounded-xl border-2 border-gray-800 px-2 py-1 lg:m-4"
            >
              Logout Metamask
            </button>
          ) : (
            !isAuthenticated && (
              <button
                onClick={authenticate}
                className="m-2 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 lg:m-4"
              >
                Connect Metamask
              </button>
            )
          )}

          {/* {!isConnected && (
            <button
              onClick={userConnect}
              className="m-2 whitespace-nowrap rounded-xl border-2 border-gray-800 px-2 py-1 lg:m-4"
            >
              Connect Sequence
            </button>
          )}
          {isConnected && (
            <button
              onClick={userDisconnect}
              className="m-2 whitespace-nowrap rounded-xl border-2 border-gray-800 px-2 py-1 lg:m-4"
            >
              Disconnect Sequence
            </button>
          )} */}
        </div>
      </div>
    </header>
  )
}
