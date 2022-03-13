import { userInfo } from 'os'
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import { EscrowABI, EscrowAddress } from '../../Contracts/EscrowContract'

export default function ReviewSubmitModal(props) {
  const { Moralis, isUserUpdating, user } = useMoralis()

  function approveReview() {
    // if (user == props.data.get('projectBrand')) {
    //   props.reviewSubmitContract()
    // }
    finalApprovalCall()
  }
  function denyReview() {
    finalRejection()
  }

  //contractCall Approve
  async function finalApprovalCall() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )
    contractEscrow.completeAgreement(props.data.id).then((result) => {
      console.log(result)
    })
  }

  //contractCall DENY
  async function finalRejection() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )
    contractEscrow.rejectAgreement(props.data.id).then((result) => {
      console.log(result)
    })
  }

  return (
    <div className="my-4 flex w-full flex-col items-center">
      <p className="mt-8 mb-8 text-2xl text-indigo-100 underline">REVIEW</p>
      <div className="mb-8 text-indigo-100">Review File below</div>
      <div
        onClick={() => window.open(props.data.get('file'))}
        className="mb-8 cursor-pointer text-xs text-white hover:underline"
      >
        {props.data.get('file')}
      </div>

      <button
        className="mt-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
        onClick={approveReview}
        disabled={isUserUpdating}
      >
        APPROVE ITEM
      </button>
      <button
        className="mt-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
        onClick={denyReview}
        disabled={isUserUpdating}
      >
        DENY ITEM
      </button>
    </div>
  )
}
