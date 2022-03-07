import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'

export default function FeaturedArtist() {
  const router = useRouter()
  const { user } = useMoralis()

  const [artistId, setArtistId] = useState()

  return (
    <div class="w-full items-center justify-center lg:flex">
      <div
        tabindex="0"
        aria-label="card 1"
        class="mb-7 rounded bg-white p-6 shadow focus:outline-none lg:mr-7 lg:mb-0 lg:w-4/12"
      >
        <div class="flex items-center border-b border-gray-200 pb-6">
          <img
            onClick={() => router.push(`/artist/${artistId}`)}
            src="/blankimg.png"
            alt="coin avatar"
            className="h-12 w-12 cursor-pointer rounded-full"
          />
          <div class="flex w-full items-start justify-between">
            <div class="w-full pl-3">
              <p
                onClick={() => router.push(`/artist/${artistId}`)}
                tabindex="0"
                class="cursor-pointer text-xl font-medium leading-5 text-gray-800 hover:underline focus:outline-none"
              >
                YIFAN PU
              </p>
              <p
                tabindex="0"
                class="pt-2 text-sm leading-normal text-gray-500 focus:outline-none"
              >
                WebsiteLink
              </p>
            </div>
            <div role="img" aria-label="bookmark">
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
            </div>
          </div>
        </div>
        <div class="px-2">
          <p
            tabindex="0"
            class="py-4 text-sm leading-5 text-gray-600 focus:outline-none"
          >
            Yifan Pu is a Chinese virtual fashion designer exploring new
            pathways into the future of the industry. She has never been a fan
            of the traditional fashion, while digital design became a perfect
            tool for her to express herself creatively without the limitations
            of the physical world, mass production, and consumption. Recently
            Yifan took part in Helsinki Fashion Week, which is renowned for
            being one of the most innovative and forward-thinking platforms for
            fashion designers.
          </p>
          <div tabindex="0" class="flex focus:outline-none">
            <div class="rounded-full bg-indigo-100 py-2 px-4 text-xs leading-3 text-indigo-700">
              #blender
            </div>
            <div class="ml-3 rounded-full bg-indigo-100 py-2 px-4 text-xs leading-3 text-indigo-700">
              #digitalfashion
            </div>
            <div class="ml-3 rounded-full bg-indigo-100 py-2 px-4 text-xs leading-3 text-indigo-700">
              #cinema4d
            </div>
            <div class="ml-3 rounded-full bg-indigo-100 py-2 px-4 text-xs leading-3 text-indigo-700">
              #dressX
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
