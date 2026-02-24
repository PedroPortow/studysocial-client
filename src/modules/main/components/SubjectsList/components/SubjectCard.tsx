import { useState } from "react"
import { Button } from "@heroui/button"
import { Card, CardBody } from "@heroui/card"
import { BookOpen, ChevronRight, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useDeleteSubject } from "../../../hooks/mutations/useDeleteSubject"
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog"
import { Subject } from "../../../types"

type SubjectCardProps = {
  subject: Subject
}

function SubjectCard({ subject }: SubjectCardProps) {
  const navigate = useNavigate()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { mutate: deleteSubject, isPending: isDeleting } = useDeleteSubject({
    onSuccess: () => setIsDeleteOpen(false),
  })

  return (
    <>
      <Card
        isPressable
        className="w-full border-1 border-default-200 bg-background/60 hover:scale-[1.01] transition-transform"
        shadow="none"
        onPress={() => navigate(`/diarioacademico/disciplinas/${subject.id}`)}
      >
        <CardBody className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
              <BookOpen className="text-primary" size={20} />
            </div>
            <p className="font-semibold">{subject.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <div onClick={(e) => e.stopPropagation()}>
              <Button
                isIconOnly
                color="danger"
                size="sm"
                variant="light"
                onPress={() => setIsDeleteOpen(true)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <ChevronRight className="text-default-400" size={20} />
          </div>
        </CardBody>
      </Card>

      <ConfirmDialog
        confirmLabel="Excluir Disciplina"
        description={`Tem certeza que deseja excluir "${subject.name}"? Todas as anotações, avaliações e faltas dessa disciplina serão removidas.`}
        isLoading={isDeleting}
        isOpen={isDeleteOpen}
        title="Excluir Disciplina"
        onConfirm={() => deleteSubject(subject.id)}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  )
}

export default SubjectCard
