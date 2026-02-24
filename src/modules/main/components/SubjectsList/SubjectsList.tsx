import { useSubjects } from "../../hooks/queries/useSubjects"

import SubjectCard from "./components/SubjectCard"

function SubjectsList() {
  const { data: subjects = [] } = useSubjects()

  if (!subjects.length) {
    return (
      <div className="text-center text-default-500 py-8">
        Nenhuma disciplina cadastrada. Crie uma para começar!
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  )
}

export default SubjectsList
