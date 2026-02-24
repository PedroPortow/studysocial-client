import { useState } from "react"
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

const MOCK_SUBJECTS = [
  { id: 1, name: "Cálculo I" },
  { id: 2, name: "Algoritmos e Estrutura de Dados" },
  { id: 3, name: "Banco de Dados" },
  { id: 4, name: "Engenharia de Software" },
  { id: 5, name: "Redes de Computadores" },
]

type CreateNoteDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateNoteDialog({
  isOpen,
  onOpenChange,
}: CreateNoteDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [subjectId, setSubjectId] = useState<string>("")

  const { mutate: createNote, isPending } = useCreateNote({
    onSuccess: () => {
      setTitle("")
      setContent("")
      setSubjectId("")
      onOpenChange(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !subjectId) return

    createNote({
      title: title.trim(),
      content: content.trim() || undefined,
      subject_id: Number(subjectId),
    })
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>Nova Anotação</ModalHeader>
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
                isRequired
                label="Disciplina"
                placeholder="Selecione a disciplina"
                selectedKeys={subjectId ? [subjectId] : []}
                variant="bordered"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0]

                  setSubjectId(selected ? String(selected) : "")
                }}
              >
                {MOCK_SUBJECTS.map((subject) => (
                  <SelectItem key={String(subject.id)}>
                    {subject.name}
                  </SelectItem>
                ))}
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
                Criar Anotação
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
