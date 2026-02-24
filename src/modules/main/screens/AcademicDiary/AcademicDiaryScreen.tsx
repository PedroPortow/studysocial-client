import { Suspense, useState } from "react"
import { Button } from "@heroui/button"
import { Select, SelectItem } from "@heroui/select"
import { Plus } from "lucide-react"

import FeedLayout from "../../components/FeedLayout/FeedLayout"
import NotesList from "../../components/NotesList/NotesList"
import { CreateNoteDialog } from "../../components/NotesList/components/CreateNoteDialog"

import DiarySection from "./components/DiarySection"

const MOCK_SUBJECTS = [
  { id: 1, name: "Cálculo I" },
  { id: 2, name: "Algoritmos e Estrutura de Dados" },
  { id: 3, name: "Banco de Dados" },
  { id: 4, name: "Engenharia de Software" },
  { id: 5, name: "Redes de Computadores" },
]

function AcademicDiaryScreen() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")

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
              onPress={() => setIsCreateDialogOpen(true)}
            >
              Nova Anotação
            </Button>
          }
          description="Suas anotações por disciplina"
          title="Anotações"
        >
          <Select
            className="max-w-xs"
            label="Filtrar por disciplina"
            placeholder="Todas as disciplinas"
            selectedKeys={selectedSubject ? [selectedSubject] : []}
            variant="bordered"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0]

              setSelectedSubject(selected ? String(selected) : "")
            }}
          >
            {MOCK_SUBJECTS.map((subject) => (
              <SelectItem key={String(subject.id)}>{subject.name}</SelectItem>
            ))}
          </Select>

          <Suspense fallback={<div>Loading...</div>}>
            <NotesList subjectId={subjectId} />
          </Suspense>
        </DiarySection>

        {/* Future sections go here, e.g.:
        <DiarySection title="Frequência" description="Controle de presença">
          ...
        </DiarySection>
        */}
      </div>

      <CreateNoteDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </FeedLayout>
  )
}

export default AcademicDiaryScreen
