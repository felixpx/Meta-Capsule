import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'

export default function MintItem() {
  const { user, isAuthenticated, Moralis } = useMoralis()
  const { saveFile } = useMoralisFile()

  const [uploadDone, setUploadDone] = useState(false)

  useEffect(() => {}, [])

  //   async function contractCall(object) {
  //     const web3Provider = await Moralis.enableWeb3()
  //     const ethers = Moralis.web3Library

  //     const contractProposal = new ethers.Contract(
  //       ConstructionAddress,
  //       ConstructionABI,
  //       web3Provider.getSigner()
  //     )
  //     contractProposal
  //       .createProposal(
  //         object.id,
  //         object.get('projectPDF'),
  //         object.get('numberOfDays'),
  //         object.get('fundingGoal')
  //       )
  //       .then((result) => {
  //         alert('proposal created')
  //       })
  //   }

  async function uploadItem(e) {
    e.preventDefault()
    const itemTitle = document.getElementById('itemTitle').value
    const itemDescription = document.getElementById('itemDescription').value
    const numberOfItems = document.getElementById('numberOfItems').value
    const pricePerItem = document.getElementById('pricePerItem').value
    const itemFile = document.getElementById('itemFile').files[0]

    let ipfsFile = ''

    if (itemFile) {
      console.log('uploading cover')
      await saveFile('itemFile', itemFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsFile = hash._ipfs
        }
      )
    }
    const metadata = {
      name: itemTitle,
      file: ipfsFile,
      description: itemDescription,
      numberOfItems: numberOfItems,
    }
    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })
    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()

    const Item = new Moralis.Object.extend('Item')
    const item = new Item()

    item.set('itemTitle', itemTitle)
    item.set('itemDescription', itemDescription)
    item.set('numberOfItems', numberOfItems)
    item.set('itemFile', ipfsFile)
    item.set('pricePerItem', pricePerItem)
    item.save().then((proposal) => {
      // contractcall
      console.log(proposal)
      setUploadDone(true)
    })
  }

  return (
    <form className="flex h-96 w-96 flex-col items-center justify-evenly space-y-4 rounded-xl bg-white bg-opacity-20">
      <input
        className="mr-4 w-64 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
        id={'itemTitle'}
        placeholder={'Title'}
        type={'text'}
      />
      <textarea
        className="mr-4 w-64 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
        id={'itemDescription'}
        placeholder={'Description'}
      />
      <input
        className="mr-4 w-64 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
        id={'numberOfItems'}
        placeholder={'Number Of Items'}
        type={'number'}
      />
      <input
        className="mr-4 w-64 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
        id={'pricePerItem'}
        placeholder={'Price Per Item'}
        type={'number'}
      />
      <input
        className="mr-4 w-64 rounded-xl bg-indigo-100 px-2 py-1 outline-none"
        id={'itemFile'}
        type={'file'}
      />
      <button
        onClick={uploadItem}
        className=" w-48 rounded-xl border border-indigo-500 bg-indigo-200 px-2 text-sm"
      >
        Upload Item
      </button>
    </form>
  )
}
