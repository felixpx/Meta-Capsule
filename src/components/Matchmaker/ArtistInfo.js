import { ClipboardCopyIcon, UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useChain, useMoralis, useMoralisFile } from 'react-moralis'

export default function ArtistInfo() {
  const { Moralis, isUserUpdating } = useMoralis()
  const { saveFile } = useMoralisFile()

  // const [walletAddress, setWalletAddress] = useState()
  // const [username, setUsername] = useState()
  // const [email, setEmail] = useState()
  // const [website, setWebsite] = useState()
  // const [wrongNetwork, setWrongNetwork] = useState(Boolean)
  // const [changeUser, setChangeUser] = useState(false)

  // useEffect(() => {
  //   if (isWeb3Enabled) enableWeb3()
  //   if (isAuthenticated && chainId != null) {
  //     if (user) {
  //       setUsername(user.get('username'))
  //       setWalletAddress(user.get('ethAddress').slice(0, 8).concat('...'))
  //       setWrongNetwork(false)
  //     }
  //   } else if (isAuthenticated && chainId != '0x13881') {
  //     if (user) {
  //       setUsername(user.get('username'))
  //       setWalletAddress(user.get('ethAddress'))
  //     }
  //     setWrongNetwork(true)
  //   } else {
  //   }
  // }, [user, isAuthenticated, chainId])

  async function saveSignup(e) {
    e.preventDefault()
    const artistName = document.getElementById('artistName').value
    const artistDescription = document.getElementById('artistDescription').value
    const artistWebsite = document.getElementById('artistWebsite').value
    const artistEmail = document.getElementById('artistEmail').value
    const artistImg = document.getElementById('artistImg').files[0]

    let ipfsArtistImg = ''

    if (artistImg) {
      console.log('uploading file')
      await saveFile('artistImg', artistImg, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsArtistImg = hash._ipfs
        }
      )
    }

    const metadata = {
      name: artistName,
      description: artistDescription,
      website: artistWebsite,
      email: artistEmail,
      img: ipfsArtistImg,
    }

    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })

    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()

    const Artists = new Moralis.Object.extend('Artists')
    const artist = new Artists()

    artist.set('artistName', artistName)
    artist.set('artistDescription', artistDescription)
    artist.set('artistWebsite', artistWebsite)
    artist.set('artistEmail', artistEmail)
    artist.set('artistImg', ipfsArtistImg)
    artist.save().then((object) => {
      // contractCall(object);
      alert('saved')
    })
  }

  return (
    <div className="my-4 flex w-full flex-col items-center">
      <p className="mt-8 mb-8 text-2xl text-indigo-100 underline">
        ARTIST SIGNUP
      </p>
      <p className="mb-8 text-indigo-100">
        Sign up as 3D Artist and build your portfolio on Meta Capsule
      </p>

      <div className=" flex flex-col space-y-4">
        <input
          id={'artistName'}
          type={'text'}
          placeholder={'Artist Name'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <input
          id={'artistEmail'}
          type={'text'}
          placeholder={'Email Address'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <input
          id={'artistWebsite'}
          type={'text'}
          placeholder={'Website'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />

        <input
          id={'artistImg'}
          type={'file'}
          placeholder={'Website'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <textarea
          id={'artistDescription'}
          type={'text'}
          placeholder={'Bio'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
      </div>
      <button
        className="mt-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
        onClick={saveSignup}
        disabled={isUserUpdating}
      >
        Save
      </button>
    </div>
  )
}
