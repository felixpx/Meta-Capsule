import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import EscrowSubmitModal from './EscrowSubmitModal'
import { EscrowABI, EscrowAddress } from '../../Contracts/EscrowContract'

export default function LiveEscrow(props) {
  //   const router = useRouter()
  const { user, Moralis } = useMoralis()

  const [artistId, setArtistId] = useState()
  const [escrowModal, setEscrowModal] = useState(false)
  const [escrowApproved, setEscrowApproved] = useState(
    props.data.get('approved')
  )

  const [submissionPending, setSubmissionPending] = useState(
    props.data.get('fileUploaded')
  )

  useEffect(() => {
    if (user) setArtistId(user.get('ethAddress'))

    // setEscrowApproved (true)
  }, [user])

  function escrowSubmit() {
    setEscrowModal(true)

    //contract call
  }

  function visitWebsite() {
    window.open('https://www.light0green.xyz')
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

  return (
    <div>
      {escrowModal && (
        <div className="fixed z-50 flex h-screen w-full justify-center  bg-white bg-opacity-80 ">
          <div className="flex h-max w-4/12 flex-col items-center justify-center border-x-2 border-b-2 border-indigo-100 bg-gray-800  shadow-2xl">
            <EscrowSubmitModal submitEscrowCall={submitEscrowCall} />

            <button
              className="mt-2 mb-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
              onClick={submitEscrowCall}
            >
              Submit to Contract
            </button>
            <button
              className="mt-2 mb-4 whitespace-nowrap rounded-lg border-2 border-indigo-400 bg-indigo-100 px-2"
              onClick={() => setEscrowModal(false)}
            >
              <XIcon className="h-5" />
            </button>
          </div>
        </div>
      )}
      <div className="w-full items-center justify-center lg:flex">
        <div
          tabindex="0"
          aria-label="card 1"
          class="mb-7 rounded-xl bg-white bg-opacity-50 p-6 shadow focus:outline-none lg:mr-7 lg:mb-0 lg:w-4/12"
        >
          <div class="flex items-center border-b border-gray-200 pb-6">
            {/* <img
              //   onClick={() => router.push(`/artist/${artistId}`)}
              src="/blankimg.png"
              alt="coin avatar"
              className="h-12 w-12 cursor-pointer rounded-full"
            /> */}
            <div class="flex w-full items-start justify-between">
              <div class="w-full pl-3">
                <p
                  //   onClick={() => router.push(`/artist/${artistId}`)}
                  tabindex="0"
                  class="cursor-pointer text-xl font-medium leading-5 text-gray-800 hover:underline focus:outline-none"
                >
                  {/* Project Name */}
                  {props.data.get('projectName')}
                </p>
                <div
                  tabindex="0"
                  class="pt-2 text-sm leading-normal text-gray-500 focus:outline-none"
                >
                  {/* ARTST & BRAND in Escrow */}
                  <p>{props.data.get('projectBrand')}</p>
                  <p>{props.data.get('projectArtist')}</p>
                </div>
                <p
                  tabindex="0"
                  class="pt-1 text-sm leading-normal text-gray-500 focus:outline-none"
                >
                  {props.data.get('projectEmail')}
                </p>
              </div>
              {/* <div role="img" aria-label="bookmark">
                <svg
                  class="focus:outline-none"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
                    stroke="#2C3E50"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div> */}
            </div>
          </div>
          <div class="px-2">
            <p
              tabindex="0"
              class=" py-4 text-sm leading-5 text-gray-600 focus:outline-none"
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

            {!submissionPending && (
              <div
                tabindex="0"
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
                tabindex="0"
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
          </div>
        </div>
      </div>
    </div>
  )
}
