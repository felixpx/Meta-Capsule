import { ClipboardCopyIcon, UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'

export default function ProfileInfo() {
  const {
    isAuthenticated,
    user,
    chainId,
    setUserData,
    isUserUpdating,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis()

  const [walletAddress, setWalletAddress] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [website, setWebsite] = useState()
  const [wrongNetwork, setWrongNetwork] = useState(Boolean)
  const [changeUser, setChangeUser] = useState(false)

  useEffect(() => {
    if (isWeb3Enabled) enableWeb3()
    if (isAuthenticated && chainId != null) {
      if (user) {
        setUsername(user.get('username'))
        setWalletAddress(user.get('ethAddress').slice(0, 8).concat('...'))
        setWrongNetwork(false)
      }
    } else if (isAuthenticated && chainId != '0x13881') {
      if (user) {
        setUsername(user.get('username'))
        setWalletAddress(user.get('ethAddress'))
      }
      setWrongNetwork(true)
    } else {
    }
  }, [user, isAuthenticated, chainId])

  const setUser = async () => {
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const website = document.getElementById('website').value
    await setUserData({
      username: username,
      email: email,
      website: website,
    })
    setChangeUser(false)
  }

  return (
    <div className="m-4 flex flex-col items-start">
      <p>{username}</p>

      <div
        className="my-2 flex cursor-pointer flex-row text-xs hover:text-indigo-600 active:text-[#f5f5f5]"
        onClick={() => {
          navigator.clipboard.writeText(walletAddress)
        }}
      >
        <p>{walletAddress}</p>
        <ClipboardCopyIcon className="h-3" />
      </div>
      <div className=" rounded-xl ">
        {!changeUser && (
          <div className="">
            <div>
              <div className=" flex flex-col items-start space-y-1 text-sm">
                {/* <p>{username}</p> */}
                <p>{user?.get('email') || ''}</p>
                <p>{user?.get('website') || ''}</p>
              </div>
              <button
                className="mt-4 flex cursor-pointer flex-row rounded-xl border border-indigo-500 bg-indigo-300 px-2 text-sm hover:text-indigo-600 active:text-[#f5f5f5]"
                onClick={() => setChangeUser(true)}
              >
                Edit Userinfo
              </button>
            </div>
          </div>
        )}
        {changeUser && (
          <div className=" flex flex-col space-y-2">
            <input
              id={'username'}
              type={'text'}
              placeholder={user ? user.get('username') : 'username'}
              className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
            />
            <input
              id={'email'}
              type={'text'}
              placeholder={user ? user.get('email') : 'email'}
              className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
            />
            <input
              id={'website'}
              type={'text'}
              placeholder={user ? user.get('website') : 'website'}
              className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
            />
            <div className="flex flex-row items-center">
              <button
                className="w-24 rounded-xl border border-indigo-500 bg-indigo-200 px-2 text-sm"
                onClick={setUser}
                disabled={isUserUpdating}
              >
                Save
              </button>
              <button
                className="w-24 rounded-xl border border-indigo-500 bg-indigo-200 px-2 text-sm"
                onClick={() => setChangeUser(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
