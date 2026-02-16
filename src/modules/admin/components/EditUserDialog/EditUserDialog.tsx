import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import { useUpdateUser } from "../../hooks/mutations/useUpdateUser";

import { User, ROLE } from "@/types/user";
import { RoleSelect } from "@/components/RoleSelect";
import { CourseSelect } from "@/components/CourseSelect";

type EditUserDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export function EditUserDialog({
  isOpen,
  onOpenChange,
  user,
}: EditUserDialogProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<ROLE>(ROLE.USER);
  const [courseName, setCourseName] = useState("");

  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setRole(user.role);
      setCourseName(user.course?.name || "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !fullName.trim()) return;

    updateUser({
      email: user.email,
      data: {
        full_name: fullName.trim(),
        role,
        course_name: courseName || undefined,
      },
    });
  };

  if (!user) return null;

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  isReadOnly
                  description="O email não pode ser alterado"
                  label="Email"
                  value={user.email}
                  variant="bordered"
                />

                <Input
                  isRequired
                  label="Nome Completo"
                  placeholder="Digite o nome completo"
                  value={fullName}
                  variant="bordered"
                  onChange={(e) => setFullName(e.target.value)}
                />

                <RoleSelect isRequired value={role} onValueChange={setRole} />

                <CourseSelect
                  value={courseName}
                  onValueChange={setCourseName}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={!fullName.trim()}
                isLoading={isPending}
                type="submit"
              >
                Salvar Alterações
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
