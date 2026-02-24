import { Select, SelectItem, SelectProps } from "@heroui/select"

import { useCourses } from "@/modules/auth/hooks/queries/useCourses"

interface CourseSelectProps
  extends Omit<SelectProps, "children" | "selectedKeys" | "onSelectionChange"> {
  value?: string
  onValueChange: (courseName: string) => void
}

export function CourseSelect({
  value,
  onValueChange,
  ...props
}: CourseSelectProps) {
  const { data: courses = [] } = useCourses()

  return (
    <Select
      label="Curso"
      placeholder="Selecione o curso"
      selectedKeys={value ? [value] : []}
      variant="bordered"
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as string

        onValueChange(selected || "")
      }}
      {...props}
    >
      {courses.map((course) => (
        <SelectItem key={course.name}>{course.name}</SelectItem>
      ))}
    </Select>
  )
}
