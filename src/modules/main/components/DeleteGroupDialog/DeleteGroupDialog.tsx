import { Button } from "@heroui/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"

import { useDeleteGroup } from "../../hooks/mutations/useDeleteGroup"

type DeleteGroupDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  groupId?: number
  groupName?: string
  onDeleted?: () => void
}

export function DeleteGroupDialog({
  isOpen,
  onOpenChange,
  groupId,
  groupName,
  onDeleted,
}: DeleteGroupDialogProps) {
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup({
    onSuccess: () => {
      onOpenChange(false)
      onDeleted?.()
    },
  })

  const confirmDelete = () => {
    if (groupId) {
      deleteGroup(groupId)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader>Excluir Grupo</ModalHeader>
            <ModalBody>
              <p>
                Tem certeza que deseja excluir o grupo &quot;{groupName}&quot;?
              </p>
              <p className="text-sm text-default-500">
                Esta ação não pode ser desfeita.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                isLoading={isDeleting}
                onPress={confirmDelete}
              >
                Excluir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
