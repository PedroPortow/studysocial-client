import { Suspense, useState } from "react"
import { Button } from "@heroui/button"
import { Select, SelectItem } from "@heroui/select"
import { Plus } from "lucide-react"

import FeedLayout from "../../components/FeedLayout/FeedLayout"
import NotesList from "../../components/NotesList/NotesList"
import { NoteDialog } from "../../components/NotesList/components/NoteDialog"
import SubjectsList from "../../components/SubjectsList/SubjectsList"
import { CreateSubjectDialog } from "../../components/SubjectsList/components/CreateSubjectDialog"
import { useSubjects } from "../../hooks/queries/useSubjects"

import DiarySection from "./components/DiarySection"

function AcademicDiaryScreen() {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  const { data: subjects = [] } = useSubjects()

  const subjectId = selectedSubject ? Number(selectedSubject) : undefined

  return (
    <FeedLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Diário Acadêmico</h2>
          <span className="text-slate-500">
            Confira suas anotações, frequência e notas!
          </span>
        </div>

        <DiarySection
          action={
            <Button
              color="primary"
              size="sm"
              startContent={<Plus size={16} />}
              onPress={() => setIsCreateSubjectOpen(true)}
            >
              Nova Disciplina
            </Button>
          }
          description="Gerencie suas disciplinas do semestre"
          title="Disciplinas"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <SubjectsList />
          </Suspense>
        </DiarySection>

        <DiarySection
          action={
            <Button
              color="primary"
              isDisabled={subjects.length === 0}
              size="sm"
              startContent={<Plus size={16} />}
              onPress={() => setIsCreateNoteOpen(true)}
            >
              Nova Anotação
            </Button>
          }
          description="Gerencie suas anotações por disciplina ou não"
          title="Anotações"
        >
          <Select
            className="max-w-xs"
            items={subjects}
            label="Filtrar por disciplina"
            placeholder="Todas as disciplinas"
            selectedKeys={selectedSubject ? [selectedSubject] : []}
            variant="bordered"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0]

              setSelectedSubject(selected ? String(selected) : "")
            }}
          >
            {(subject) => (
              <SelectItem key={String(subject.id)}>{subject.name}</SelectItem>
            )}
          </Select>

          <Suspense fallback={<div>Loading...</div>}>
            <NotesList subjectId={subjectId} />
          </Suspense>
        </DiarySection>
      </div>

      <CreateSubjectDialog
        isOpen={isCreateSubjectOpen}
        onOpenChange={setIsCreateSubjectOpen}
      />
      <NoteDialog
        isOpen={isCreateNoteOpen}
        onOpenChange={setIsCreateNoteOpen}
      />
    </FeedLayout>
  )
}

export default AcademicDiaryScreen
