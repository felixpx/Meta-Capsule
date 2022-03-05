export default function HeaderItem({ Icon, title }) {
  return (
    <div className="group flex w-12 cursor-pointer flex-col items-center hover:text-red-500 sm:w-20">
      <Icon className="h-6 group-hover:animate-bounce" />
      <p className=" flex whitespace-nowrap text-black opacity-30 group-hover:opacity-100">
        {title}
      </p>
    </div>
  )
}
