import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Trash2 } from "lucide-react"

import { useAuth } from "../../../hooks/useAuth"
import { useDeleteNote } from "../../../hooks/mutations/useDeleteNote"
import { Note } from "../../../types"

import { formatDate } from "@/utils"

type NoteCardProps = {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
  const { user } = useAuth()
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote()

  const isOwner = user?.email === note.user.email || user?.role === "ADMIN"

  return (
    <Card
      className="w-full border-1 p-3 border-default-200 bg-background/60"
      shadow="none"
    >
      <CardHeader className="flex justify-between pb-2">
        <h3 className="font-bold text-lg leading-tight">{note.title}</h3>
        <div className="flex gap-2 items-center">
          <p className="text-xs text-default-400">{formatDate(note.created_at)}</p>
          {isOwner && (
            <Button
              isIconOnly
              color="danger"
              isLoading={isDeleting}
              size="sm"
              variant="light"
              onPress={() => deleteNote(note.id)}
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
        <p className="text-xs text-default-400">
          Disciplina ID: {note.subject_id}
        </p>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
