import { useEffect, useState } from "react"
import { Button } from "@heroui/button"
import { Input, Textarea } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"

import { useCreateNote } from "../../../hooks/mutations/useCreateNote"
import { useUpdateNote } from "../../../hooks/mutations/useUpdateNote"
import { useSubjects } from "../../../hooks/queries/useSubjects"
import { Note } from "../../../types"

type NoteDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  note?: Note | null
}

export function NoteDialog({ isOpen, onOpenChange, note }: NoteDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [subjectId, setSubjectId] = useState<string>("")

  const isEditing = !!note

  const { data: subjects = [] } = useSubjects()

  const { mutate: createNote, isPending: isCreating } = useCreateNote({
    onSuccess: () => {
      resetAndClose()
    },
  })

  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote({
    onSuccess: () => {
      resetAndClose()
    },
  })

  const isPending = isCreating || isUpdating

  useEffect(() => {
    if (note && isOpen) {
      setTitle(note.title)
      setContent(note.content ?? "")
      setSubjectId(String(note.subject_id))
    } else if (!isOpen) {
      setTitle("")
      setContent("")
      setSubjectId("")
    }
  }, [note, isOpen])

  function resetAndClose() {
    setTitle("")
    setContent("")
    setSubjectId("")
    onOpenChange(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !subjectId) return

    if (isEditing) {
      updateNote({
        id: note.id,
        data: {
          title: title.trim(),
          content: content.trim() || undefined,
        },
      })
    } else {
      createNote({
        title: title.trim(),
        content: content.trim() || undefined,
        subject_id: Number(subjectId),
      })
    }
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {isEditing ? "Editar Anotação" : "Nova Anotação"}
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                isRequired
                label="Título"
                maxLength={120}
                placeholder="Digite o título da anotação"
                value={title}
                variant="bordered"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Select
                isDisabled={isEditing}
                isRequired
                items={subjects}
                label="Disciplina"
                placeholder="Selecione a disciplina"
                selectedKeys={subjectId ? [subjectId] : []}
                variant="bordered"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0]

                  setSubjectId(selected ? String(selected) : "")
                }}
              >
                {(subject) => (
                  <SelectItem key={String(subject.id)}>
                    {subject.name}
                  </SelectItem>
                )}
              </Select>
              <Textarea
                label="Conteúdo"
                minRows={4}
                placeholder="Escreva sua anotação (opcional)"
                value={content}
                variant="bordered"
                onChange={(e) => setContent(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={!title.trim() || !subjectId}
                isLoading={isPending}
                type="submit"
              >
                {isEditing ? "Salvar" : "Criar Anotação"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
