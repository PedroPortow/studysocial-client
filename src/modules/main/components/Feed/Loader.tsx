import { Skeleton } from "@heroui/skeleton"

function Loader() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-48" />
      ))}
    </div>
  )
}

export default Loader
