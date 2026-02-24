import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import FeedLayout from "../../components/FeedLayout/FeedLayout"
import { useSubject } from "../../hooks/queries/useSubject"

function SubjectDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

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
      <div className="flex flex-col gap-4 w-full max-w-xl">
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

        {/* Future: Assessment and Absence sections go here */}
      </div>
    </FeedLayout>
  )
}

export default SubjectDetailScreen
