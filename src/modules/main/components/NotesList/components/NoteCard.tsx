import { useState } from "react"
import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { BookOpen, Trash2 } from "lucide-react"

import { useAuth } from "../../../hooks/useAuth"
import { useDeleteNote } from "../../../hooks/mutations/useDeleteNote"
import { ConfirmDialog } from "../../ConfirmDialog/ConfirmDialog"
import { Note } from "../../../types"

import { formatDate } from "@/utils"

type NoteCardProps = {
  note: Note
  onPress?: (note: Note) => void
}

function NoteCard({ note, onPress }: NoteCardProps) {
  const { user } = useAuth()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote({
    onSuccess: () => setIsDeleteOpen(false),
  })

  const isOwner = user?.email === note.user.email || user?.role === "ADMIN"

  return (
    <>
      <Card
        className="w-full border-1 p-3 border-default-200 bg-background/60"
        isHoverable={!!onPress}
        isPressable={!!onPress}
        shadow="none"
        onPress={() => onPress?.(note)}
      >
        <CardHeader className="flex justify-between pb-2">
          <h3 className="font-bold text-lg leading-tight">{note.title}</h3>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-default-400">
              {formatDate(note.created_at)}
            </p>
            {isOwner && (
              <Button
                isIconOnly
                color="danger"
                size="sm"
                variant="light"
                onPress={() => setIsDeleteOpen(true)}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        </CardHeader>
        {note.content && (
          <CardBody className="py-2">
            <p className="text-default-600 text-sm whitespace-pre-wrap">
              {note.content}
            </p>
          </CardBody>
        )}
        <CardFooter className="pt-2">
          <Chip size="sm" startContent={<BookOpen size={12} />} variant="flat">
            {note.subject_name}
          </Chip>
        </CardFooter>
      </Card>

      <ConfirmDialog
        confirmLabel="Excluir Anotação"
        description={`Tem certeza que deseja excluir a anotação "${note.title}"?`}
        isLoading={isDeleting}
        isOpen={isDeleteOpen}
        title="Excluir Anotação"
        onConfirm={() => deleteNote(note.id)}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  )
}

export default NoteCard
