import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  function openDiscover() {
    router.push('/')
  }
  function openShop() {
    router.push('/shop')
  }
  function openComission() {
    router.push('/matchmaker')
  }
  function openAccount() {
    router.push('/account')
  }

  function openUpload() {
    router.push('/upload')
  }

  return (
    <nav className="flex h-12 w-full items-center overflow-x-scroll whitespace-nowrap bg-gray-800 pl-10 scrollbar-hide sm:space-x-20 sm:px-20">
      <div className="top-18 absolute left-0 h-10 w-1/12 bg-gradient-to-l from-gray-800" />
      <div className="flex space-x-10 px-16 pl-10 text-lg text-white sm:space-x-10 sm:pl-4 ">
        <button onClick={openDiscover}>Discover</button>
        <button onClick={openShop}>Shop</button>
        <button onClick={openComission}>Matchmaker</button>
        <button onClick={openAccount}>Account</button>
        <button onClick={openUpload}>Upload Items</button>
      </div>
      <div className="top-18 absolute right-0 h-10 w-1/12 bg-gradient-to-r from-gray-800 lg:from-transparent lg:to-transparent" />
    </nav>
  )
}
