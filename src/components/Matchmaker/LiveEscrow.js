import { CheckCircleIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import EscrowSubmitModal from './EscrowSubmitModal'
import ReviewSubmitModal from './ReviewSubmitModal'
import { EscrowABI, EscrowAddress } from '../../Contracts/EscrowContract'

export default function LiveEscrow(props) {
  const { user, Moralis } = useMoralis()

  const [artistId, setArtistId] = useState()
  const [escrowModal, setEscrowModal] = useState(false)
  const [escrowApproved, setEscrowApproved] = useState(
    props.data.get('approved')
  )
  const [submissionPending, setSubmissionPending] = useState(
    props.data.get('fileUploaded')
  )

  const [finalApp, setFinalApp] = useState(props.data.get('finalApproval'))

  const [showButtons, setShowButtons] = useState()

  const [review, setReview] = useState()

  useEffect(() => {
    if (user) setArtistId(user.get('ethAddress'))
    if (finalApp && !finalApp != undefined) {
      setShowButtons(false)
    } else {
      setShowButtons(true)
    }
  }, [user])

  function escrowSubmit() {
    return setEscrowModal(true)
  }

  function escrowApprove() {
    approveEscrowCall()
  }

  //contractCall
  async function approveEscrowCall() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )
    contractEscrow.acceptAgreement(props.data.id).then((result) => {
      console.log(result)
      setEscrowApproved(true)
    })
  }

  //contract Call Submission
  const submitEscrowCall = async (fileName) => {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )

    contractEscrow.uploadFiles(props.data.id, fileName).then((result) => {
      console.log(result)
      setEscrowModal(false)
      setSubmissionPending(true)
    })
  }

  function reviewSubmission() {
    setReview(true)
  }

  const reviewSubmitContract = async () => {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )
    contractEscrow.completeAgreement(props.data.id).then((result) => {
      console.log(result)
      setFinalApp(true)
      setReview(false)
      alert('successfully approved the item of this contract')
    })
  }
  const reviewDenyContract = async () => {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractEscrow = new ethers.Contract(
      EscrowAddress,
      EscrowABI,
      web3Provider.getSigner()
    )
    contractEscrow.rejectAgreement(props.data.id).then((result) => {
      console.log(result)
      setFinalApp(false)
      setReview(false)
      alert('successfully denied the item of this contract')
    })
  }

  return (
    <div className="h-screen w-full">
      {escrowModal && (
        <div className="fixed z-50 flex h-screen w-full justify-center  bg-white bg-opacity-80 ">
          <div className="z-50 flex h-max w-4/12 flex-col items-center justify-center border-x-2 border-b-2 border-indigo-100 bg-gray-800  shadow-2xl">
            <EscrowSubmitModal submitEscrowCall={submitEscrowCall} />
            <button
              className="mt-2 mb-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
              onClick={() => setEscrowModal(false)}
            >
              <XIcon className="h-5" />
            </button>
          </div>
        </div>
      )}
      {review && (
        <div className="fixed z-50 flex h-screen w-full justify-center  bg-white bg-opacity-80 ">
          <div className="flex h-max w-4/12 flex-col items-center justify-center border-x-2 border-b-2 border-indigo-100 bg-gray-800  shadow-2xl">
            <ReviewSubmitModal
              data={props.data}
              reviewSubmitContract={reviewSubmitContract}
              reviewDenyContract={reviewDenyContract}
            />
            <button
              className="mt-2 mb-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
              onClick={() => setReview(false)}
            >
              <XIcon className="h-5" />
            </button>
          </div>
        </div>
      )}
      <div className="w-full items-center justify-center lg:flex">
        <div
          tabIndex="0"
          aria-label="card 1"
          className="mb-7 rounded-xl bg-white bg-opacity-50 p-6 shadow focus:outline-none lg:mr-7 lg:mb-0 lg:w-4/12"
        >
          <div className="flex items-center border-b border-gray-200 pb-6">
            <div className="flex w-full items-start justify-between">
              <div className="w-full pl-3">
                <p
                  tabIndex="0"
                  className="text-xl font-medium leading-5 text-gray-800 focus:outline-none"
                >
                  {props.data.get('projectName')}
                </p>
                <p
                  tabIndex="0"
                  className="mt-2 text-sm font-medium leading-5 text-gray-800 focus:outline-none"
                >
                  Deadline -{props.data.get('projectDeadline')}
                </p>
                <div
                  tabIndex="0"
                  className="pt-2 text-sm leading-normal text-gray-500 focus:outline-none"
                >
                  {/* ARTST & BRAND in Escrow */}
                  <p>{props.data.get('projectBrand')}</p>
                  <p>{props.data.get('projectArtist')}</p>
                </div>
                <p
                  tabIndex="0"
                  className="pt-1 text-sm leading-normal text-gray-500 focus:outline-none"
                >
                  {props.data.get('projectEmail')}
                </p>
              </div>
            </div>
          </div>
          <div className="px-2">
            <p
              tabIndex="0"
              className=" py-4 text-sm leading-5 text-gray-600 focus:outline-none"
            >
              Hi I'm Yifan Pu (sometimes as light0green). I'm a Chinese virtual
              fashion designer and artist currently based in Berlin. I taught
              myself CLO3d with a previous knowledge of 3d modelling and a
              constant passion for fashion. I find virtual fashion a perfect
              tool to express pure creation and a second self-identity freed
              from physical limitations, mass production and consumption. The
              username light0green is a combination of my favourite colour light
              green and the character Yagami Light (pronounced Rai-to) from
              anime Death Note.
              {/* {props.data.get('projectDescription')} */}
            </p>
            {finalApp && (
              <div className="flex flex-row items-center justify-center">
                <p>APPROVED</p>
                <CheckCircleIcon className="h-6 text-green-500" />
              </div>
            )}
            {!finalApp && finalApp != undefined && (
              <div className="flex flex-row items-center justify-center">
                <p>DENIED</p>
                <XIcon className="h-6 text-red-500" />
              </div>
            )}
            {showButtons && (
              <div>
                {!submissionPending && (
                  <div
                    tabIndex="0"
                    className="flex items-center justify-evenly focus:outline-none "
                  >
                    <button
                      onClick={escrowSubmit}
                      className={`m-1 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
                        !escrowApproved &&
                        'cursor-not-allowed border-white bg-black bg-opacity-20 text-white'
                      }`}
                    >
                      Escrow Submission
                    </button>
                    <button
                      onClick={escrowApprove}
                      className={`m-1 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
                        escrowApproved &&
                        'cursor-not-allowed border-white bg-black bg-opacity-20 text-white'
                      }`}
                    >
                      Approve Submission
                    </button>
                  </div>
                )}
                {submissionPending && (
                  <div
                    tabIndex="0"
                    className="flex items-center justify-evenly focus:outline-none "
                  >
                    <button
                      className={`m-1 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1 ${
                        submissionPending &&
                        'cursor-default border-white bg-black bg-opacity-20 text-white'
                      }`}
                    >
                      Submission Pending
                    </button>
                  </div>
                )}
                {submissionPending && (
                  <div
                    tabIndex="0"
                    className="flex items-center justify-evenly focus:outline-none "
                  >
                    <button
                      onClick={reviewSubmission}
                      className={`m-1 whitespace-nowrap rounded-lg border-2 border-gray-800 px-2 py-1`}
                    >
                      Review Submission
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
