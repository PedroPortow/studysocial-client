import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import { useDeletePost } from "../../hooks/mutations/useDeletePost";

type RemovePostModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  postId?: number;
};

export function RemovePostModal({
  isOpen,
  onOpenChange,
  postId,
}: RemovePostModalProps) {
  // @ts-expect-error - é a vida
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost(postId);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader>Excluir publicação</ModalHeader>
            <ModalBody>
              <p>Tem certeza que deseja excluir esta publicação?</p>
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
                onPress={() => deletePost(postId)}
              >
                Excluir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
