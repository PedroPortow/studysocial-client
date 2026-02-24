import { useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"

import { useCreateSubject } from "../../../hooks/mutations/useCreateSubject"

type CreateSubjectDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSubjectDialog({
  isOpen,
  onOpenChange,
}: CreateSubjectDialogProps) {
  const [name, setName] = useState("")

  const { mutate: createSubject, isPending } = useCreateSubject({
    onSuccess: () => {
      setName("")
      onOpenChange(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    createSubject({ name: name.trim() })
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>Nova Disciplina</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                isRequired
                label="Nome da Disciplina"
                maxLength={80}
                placeholder="Ex: Cálculo I, Banco de Dados..."
                value={name}
                variant="bordered"
                onChange={(e) => setName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={!name.trim()}
                isLoading={isPending}
                type="submit"
              >
                Criar Disciplina
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
