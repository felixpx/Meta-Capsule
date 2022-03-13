import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

export default function ArtistInfo(props) {
  const { Moralis, isUserUpdating } = useMoralis()
  const { saveFile } = useMoralisFile()

  async function saveEscrowSubmit(e) {
    e.preventDefault()
    const projectDescription =
      document.getElementById('projectDescription').value
    const projectFile = document.getElementById('projectFile').files[0]

    let ipfsProjectFile = ''

    if (projectFile) {
      console.log('uploading file')
      await saveFile('projectFile', projectFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsProjectFile = hash._ipfs
        }
      )
    }

    const metadata = {
      description: projectDescription,
      img: ipfsProjectFile,
    }

    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })

    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()

    props.submitEscrowCall(ipfsProjectFile)
  }

  return (
    <div className="my-4 flex w-full flex-col items-center">
      <p className="mt-8 mb-8 text-2xl text-indigo-100 underline">ESCROW</p>
      <p className="mb-8 text-indigo-100">Propose escrow for 3D Artist</p>

      <div className=" flex flex-col space-y-4">
        <input
          id={'projectFile'}
          type={'file'}
          placeholder={'Project File'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <textarea
          id={'projectDescription'}
          type={'text'}
          placeholder={'Notes'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
      </div>
      <button
        className="mt-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
        onClick={saveEscrowSubmit}
        disabled={isUserUpdating}
      >
        Save Files & Submit to Contract
      </button>
    </div>
  )
}
