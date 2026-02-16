import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import PostForm from "../PostForm/PostForm";

interface CreatePostDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  societyId?: number;
}

export function CreatePostDialog({
  isOpen,
  onOpenChange,
  societyId,
}: CreatePostDialogProps) {
  return (
    <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Criar Nova Postagem
            </ModalHeader>
            <ModalBody>
              <PostForm societyId={societyId} onClose={onClose} />
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
