import { Suspense, useState } from "react"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"
import { ArrowLeft, Plus } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import FeedLayout from "../../components/FeedLayout/FeedLayout"
import NotesList from "../../components/NotesList/NotesList"
import { NoteDialog } from "../../components/NotesList/components/NoteDialog"
import { AbsencesTable } from "../../components/AbsencesTable/AbsencesTable"
import { useSubject } from "../../hooks/queries/useSubject"
import DiarySection from "../AcademicDiary/components/DiarySection"

function SubjectDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const [isAbsenceDialogOpen, setIsAbsenceDialogOpen] = useState(false)

  const subjectId = Number(id)
  const { data: subject, isPending } = useSubject(subjectId)

  if (isPending) {
    return (
      <FeedLayout>
        <div className="flex justify-center items-center h-full py-16">
          <Spinner size="lg" />
        </div>
      </FeedLayout>
    )
  }

  if (!subject) {
    return (
      <FeedLayout>
        <div>Disciplina não encontrada</div>
      </FeedLayout>
    )
  }

  return (
    <FeedLayout>
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        <Button
          className="w-fit"
          startContent={<ArrowLeft size={16} />}
          variant="bordered"
          onPress={() => navigate("/diarioacademico")}
        >
          Voltar
        </Button>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{subject.name}</h2>
          <span className="text-slate-500">
            Avaliações, faltas e anotações desta disciplina
          </span>
        </div>

        <DiarySection
          action={
            <Button
              color="primary"
              size="sm"
              startContent={<Plus size={16} />}
              onPress={() => setIsAbsenceDialogOpen(true)}
            >
              Nova Falta
            </Button>
          }
          description="Controle suas faltas nesta disciplina"
          title="Faltas"
        >
          <AbsencesTable
            isCreateOpen={isAbsenceDialogOpen}
            subjectId={subjectId}
            onCreateOpenChange={setIsAbsenceDialogOpen}
          />
        </DiarySection>

        <DiarySection
          action={
            <Button
              color="primary"
              size="sm"
              startContent={<Plus size={16} />}
              onPress={() => setIsCreateNoteOpen(true)}
            >
              Nova Anotação
            </Button>
          }
          description="Anotações desta disciplina"
          title="Anotações"
        >
          <Suspense fallback={<div>Carregando anotações...</div>}>
            <NotesList subjectId={subjectId} />
          </Suspense>
        </DiarySection>
      </div>

      <NoteDialog
        defaultSubjectId={subjectId}
        isOpen={isCreateNoteOpen}
        onOpenChange={setIsCreateNoteOpen}
      />
    </FeedLayout>
  )
}

export default SubjectDetailScreen
