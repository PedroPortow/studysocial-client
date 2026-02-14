import { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import { useCreateGroup } from "../../hooks/mutations/useCreateGroup";

type CreateGroupDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateGroupDialog({
  isOpen,
  onOpenChange,
}: CreateGroupDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: createGroup, isPending } = useCreateGroup({
    onSuccess: () => {
      setName("");
      setDescription("");
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createGroup({
      name: name.trim(),
      description: description.trim(),
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>Criar Novo Grupo</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Nome do Grupo"
                placeholder="Digite o nome do grupo"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
              <Textarea
                label="Descrição"
                placeholder="Descreva o grupo (opcional)"
                variant="bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isPending}
                isDisabled={!name.trim()}
              >
                Criar Grupo
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
