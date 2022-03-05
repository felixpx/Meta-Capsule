import Image from 'next/image'
import Transition from '../HeadlessUI/Transition'

export default function DicoverPage() {
  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-8">
        <div>
          <Image width={500} height={500} src={'/light0green3.png'} />
        </div>
        <div>
          <Image width={500} height={500} src={'/light0green4.png'} />
        </div>
      </div>
    </>
  )
}
