import { ClipboardCopyIcon, UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useChain, useMoralis, useMoralisFile } from 'react-moralis'
import { EscrowABI, EscrowAddress } from '../../Contracts/EscrowContract'
import { USDCABI, USDCAddress } from '../../Contracts/USDCContract'

export default function ArtistInfo() {
  const { Moralis, isUserUpdating, user } = useMoralis()
  const { saveFile } = useMoralisFile()

  // contract Call
  async function contractCall(object) {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )
    const USDCContract = new ethers.Contract(
      USDCAddress,
      USDCABI,
      web3Provider.getSigner()
    )

    const seller = '0xb1ba2461A158a55a15715A1EF8359132e1e28897'
    const date = new Date(object.get('projectDeadline'))
    let time = date.getTime()

    const projectAmount = object.get('projectPayment')

    console.log(projectAmount)

    const preparedAmount = ethers.utils.parseUnits(projectAmount.toString(), 6)

    console.log(preparedAmount)

    USDCContract.approve(EscrowAddress, preparedAmount).then((result) => {
      contractEscrow
        .createAgreement(object.id, seller, time, projectAmount)
        .then((result) => {
          console.log(result)
        })
    })
  }

  // Save Escrow in Moralis
  async function saveEscrow(e) {
    e.preventDefault()
    const projectName = document.getElementById('projectName').value
    const projectDescription =
      document.getElementById('projectDescription').value
    const projectEmail = document.getElementById('projectEmail').value
    const projectPayment = document.getElementById('projectPayment').value
    const projectFile = document.getElementById('projectFile').files[0]
    const projectDeadline = document.getElementById('projectDeadline').value
    const projectBrand = user.get('ethAddress')
    const projectArtist = '0xb1ba2461a158a55a15715a1ef8359132e1e28897'

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
      name: projectName,
      description: projectDescription,
      email: projectEmail,
      img: ipfsProjectFile,
      payment: projectPayment,
    }

    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })

    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()

    const Escrow = new Moralis.Object.extend('Escrow')
    const escrow = new Escrow()

    escrow.set('projectName', projectName)
    escrow.set('projectDescription', projectDescription)
    escrow.set('projectEmail', projectEmail)
    escrow.set('projectPayment', projectPayment)
    escrow.set('projectFile', ipfsProjectFile)
    escrow.set('projectDeadline', projectDeadline)
    escrow.set('projectBrand', projectBrand)
    escrow.set('projectArtist', projectArtist)
    escrow.save().then((object) => {
      contractCall(object)
      alert('saved')
    })
  }

  return (
    <div className="my-4 flex w-full flex-col items-center">
      <p className="mt-8 mb-8 text-2xl text-indigo-100 underline">ESCROW</p>
      <p className="mb-8 text-indigo-100">Propose escrow for 3D Artist</p>

      <div className=" flex flex-col space-y-4">
        <input
          id={'projectName'}
          type={'text'}
          placeholder={'Project Name'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <input
          id={'projectEmail'}
          type={'text'}
          placeholder={'Email Address'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <input
          id={'projectPayment'}
          type={'number'}
          placeholder={'Payment in USDC'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <input
          id={'projectDeadline'}
          type={'date'}
          placeholder={'Deadline'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />

        <input
          id={'projectFile'}
          type={'file'}
          placeholder={'Project File'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
        <textarea
          id={'projectDescription'}
          type={'text'}
          placeholder={'Project Description'}
          className="mr-4 rounded-xl bg-indigo-100 px-2 py-1 outline outline-black"
        />
      </div>
      <button
        className="mt-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
        onClick={saveEscrow}
        disabled={isUserUpdating}
      >
        Apply
      </button>
    </div>
  )
}
