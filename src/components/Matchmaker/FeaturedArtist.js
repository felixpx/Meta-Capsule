import { ClipboardCopyIcon, ExternalLinkIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export default function FeaturedArtist() {
  const router = useRouter()
  const { user } = useMoralis()

  const [artistId, setArtistId] = useState()

  const artistEmail = 'artistname@email.com'

  useEffect(() => {
    if (user) setArtistId(user.get('ethAddress'))
  }, [user])

  return (
    <div className="m-4 flex h-36 w-9/12 items-center rounded-xl border-r-2 border-b-2 border-t-2 border-l-2 border-gray-800 border-l-white border-t-white bg-[#f5f5f5] shadow-xl md:w-6/12 lg:w-4/12 xl:w-3/12">
      <div className="mx-2 flex w-full flex-row items-center justify-evenly sm:justify-around">
        <div className="flex w-6/12 items-start sm:w-6/12 lg:w-6/12 ">
          <Image
            onClick={() => router.push(`/artist/${artistId}`)}
            src={'/hero.png'}
            height={125}
            width={125}
            className="cursor-pointer rounded-xl"
          />
        </div>
        <div className="whitespace-nowra flex w-6/12 flex-col items-start justify-start space-y-2 sm:w-6/12 lg:w-6/12">
          <div
            onClick={() => router.push(`/artist/${artistId}`)}
            className="flex cursor-pointer flex-row text-lg font-bold"
          >
            <p className="underline">Artist Name</p>
            <ExternalLinkIcon className="text-light h-2" />
          </div>
          <p>Blender, Cinema 4D</p>
          <p>XRCouture, DressX</p>
          <div
            className="flex cursor-pointer flex-row hover:text-indigo-300"
            onClick={() => {
              navigator.clipboard.writeText(artistEmail)
            }}
          >
            <p>{artistEmail}</p>
            <ClipboardCopyIcon className="h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
