import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { Fragment, useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import { MintABI, mintAddress } from '../../../Contracts/MintContract'
import {
  MarketABI,
  marketplaceAddress,
} from '../../../Contracts/MarketplaceContract'

export default function MintItem() {
  const { user, isAuthenticated, Moralis, enableWeb3, web3Library } =
    useMoralis()
  const { saveFile } = useMoralisFile()

  const [uploadDone, setUploadDone] = useState(false)

  const [selected, setSelected] = useState()
  const [categories, setCategories] = useState([])
  const [selectedId, setSelectedId] = useState(new Map())

  async function contractCall(object) {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library
    const contractMint = new ethers.Contract(
      mintAddress,
      MintABI,
      web3Provider.getSigner()
    )
    contractMint
      .createItem(
        object.get('itemTitle'),
        object.id,
        object.get('numberOfItems'),
        object.get('pricePerItem'),
        object.get('metadataURI')
      )
      .then((result) => {
        contractMint.setApprovalForAll(marketplaceAddress, true)
        alert('uploaded & approved.')
      })
  }

  //CATEGORY MAP USEFX

  useEffect(() => {
    const ItemCategory = Moralis.Object.extend('ItemCategory')
    const query = new Moralis.Query(ItemCategory)
    query.find().then((results) => {
      let r = []
      let rmap = new Map()
      results.forEach((result) => {
        r.push({ id: result.id, Category: result.get('Category') })
        rmap[result.get('Category')] = result.id
      })
      setCategories(r)
      setSelectedId(rmap)
    })
  }, [])

  //  IPFS STORAGE
  async function uploadItem(e) {
    e.preventDefault()
    const itemTitle = document.getElementById('itemTitle').value
    const itemDescription = document.getElementById('itemDescription').value
    const numberOfItems = document.getElementById('numberOfItems').value
    const pricePerItem = document.getElementById('pricePerItem').value
    const itemFile = document.getElementById('itemFile').files[0]
    const selectedCategory = selected

    // const itemFile2 = document.getElementById('itemFile2').files[0]

    let ipfsFile = ''

    if (itemFile) {
      console.log('uploading file')
      await saveFile('itemFile', itemFile, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsFile = hash._ipfs
        }
      )
    }

    const metadata = {
      name: itemTitle,
      image: ipfsFile,
      description: itemDescription,
    }

    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })
    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()

    const Item = new Moralis.Object.extend('Item')
    const item = new Item()

    const ItemCategory = Moralis.Object.extend('ItemCategory')
    const categorie = new ItemCategory()
    categorie.set('objectId', selectedId[selected])

    item.set('itemTitle', itemTitle)
    item.set('itemDescription', itemDescription)
    item.set('numberOfItems', numberOfItems)
    item.set('itemFile', ipfsFile)
    item.set('pricePerItem', pricePerItem)
    item.set('category', categorie)
    item.set('metadata', metadataFile)
    item.set('metadataURI', metadataURI)
    item.save().then((object) => {
      contractCall(object)
      console.log(object)
      setUploadDone(true)
    })
  }

  return (
    <form className="flex h-max w-96 flex-col items-center justify-evenly space-y-8 rounded-xl bg-white bg-opacity-20 pt-4 pb-4">
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

      <div className="w-72">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="focus-visible:ring-[f5f5f5] relative w-full cursor-default rounded-lg bg-indigo-200 bg-opacity-80 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-300 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selected ? selected : 'Choose Category'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category, categoryIdx) => (
                  <Listbox.Option
                    key={categoryIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-indigo-100 text-indigo-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={category.Category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {category.Category}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <button
        onClick={uploadItem}
        className={`whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 text-sm`}
      >
        Upload Item
      </button>
      {uploadDone && <div>Upload done!</div>}
    </form>
  )
}
