import { useEffect, useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"

import { useCreateAbsence } from "../../../hooks/mutations/useCreateAbsence"
import { useUpdateAbsence } from "../../../hooks/mutations/useUpdateAbsence"
import { Absence } from "../../../types"

type AbsenceDialogProps = {
  subjectId: number
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  absence?: Absence | null
}

export function AbsenceDialog({
  subjectId,
  isOpen,
  onOpenChange,
  absence,
}: AbsenceDialogProps) {
  const [quantity, setQuantity] = useState("1")
  const [date, setDate] = useState("")
  const [reason, setReason] = useState("")

  const isEditing = !!absence

  const { mutate: createAbsence, isPending: isCreating } = useCreateAbsence({
    onSuccess: () => resetAndClose(),
  })

  const { mutate: updateAbsence, isPending: isUpdating } = useUpdateAbsence({
    onSuccess: () => resetAndClose(),
  })

  const isPending = isCreating || isUpdating

  useEffect(() => {
    if (absence && isOpen) {
      setQuantity(String(absence.quantity))
      setDate(absence.date)
      setReason(absence.reason ?? "")
    } else if (!isOpen) {
      setQuantity("1")
      setDate("")
      setReason("")
    } else if (!absence && isOpen) {
      setQuantity("1")
      setDate(new Date().toISOString().slice(0, 10))
      setReason("")
    }
  }, [absence, isOpen])

  function resetAndClose() {
    setQuantity("1")
    setDate("")
    setReason("")
    onOpenChange(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = parseInt(quantity, 10)
    if (Number.isNaN(q) || q < 1 || !date.trim()) return

    if (isEditing) {
      updateAbsence({
        id: absence.id,
        data: {
          quantity: q,
          date: date.trim(),
          reason: reason.trim() || undefined,
        },
      })
    } else {
      createAbsence({
        subject_id: subjectId,
        quantity: q,
        date: date.trim(),
        reason: reason.trim() || undefined,
      })
    }
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {isEditing ? "Editar Falta" : "Registrar Falta"}
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                isRequired
                label="Quantidade"
                min={1}
                placeholder="Ex: 2"
                type="number"
                value={quantity}
                variant="bordered"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Input
                isRequired
                label="Data"
                type="date"
                value={date}
                variant="bordered"
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                label="Motivo (opcional)"
                maxLength={80}
                placeholder="Ex: Consulta médica"
                value={reason}
                variant="bordered"
                onChange={(e) => setReason(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={
                  !quantity ||
                  Number.isNaN(parseInt(quantity, 10)) ||
                  parseInt(quantity, 10) < 1 ||
                  !date.trim()
                }
                isLoading={isPending}
                type="submit"
              >
                {isEditing ? "Salvar" : "Registrar Falta"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
