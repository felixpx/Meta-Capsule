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
    <div className="flex h-36 w-9/12 items-center rounded-xl bg-[#f5f5f5] sm:w-3/12">
      <div className="mx-2 flex w-full flex-row items-center justify-evenly">
        <div className="flex w-6/12 items-start">
          <Image
            onClick={() => router.push(`/artist/${artistId}`)}
            src={'/hero.png'}
            height={125}
            width={125}
            className="cursor-pointer rounded-xl"
          />
        </div>
        <div className="flex w-6/12 flex-col items-start justify-start whitespace-nowrap">
          <p
            onClick={() => router.push(`/artist/${artistId}`)}
            className="cursor-pointer text-lg font-bold"
          >
            Artist Name
          </p>
          <p>Blender, Cinema 4D</p>
          <p>XRCouture, DressX</p>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => {
              navigator.clipboard.writeText({ artistEmail })
            }}
          >
            {artistEmail}
          </p>
        </div>
      </div>
    </div>
  )
}
