import { ReactNode } from "react"

interface DiarySectionProps {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

function DiarySection({
  title,
  description,
  action,
  children,
}: DiarySectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <span className="text-sm text-default-500">{description}</span>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export default DiarySection
