import React from "react"

interface SectionProps {
  children: React.ReactNode
  title: string
  description?: string
  RightContent?: React.ReactNode
}

function Section({ children, title, description, RightContent }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        {RightContent}
      </div>
      {children}
    </section>
  )
}

export default Section
