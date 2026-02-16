import { useState } from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Pagination } from "@heroui/pagination";
import { useDisclosure } from "@heroui/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pencil, Trash2 } from "lucide-react";

import { EditUserDialog } from "../EditUserDialog/EditUserDialog";
import { useUsers } from "../../hooks/queries/useUsers";

import { usePagination } from "@/hooks/usePagination";
import { User } from "@/types/user";

const PER_PAGE = 4;

export function UsersTable() {
  const { data: response } = useUsers();
  const users = response?.data || [];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { currentPage, totalPages, data, setPage } = usePagination({
    data: users,
    perPage: PER_PAGE,
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <>
      <Table
        bottomContent={
          totalPages > 1 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                className="cursor-pointer"
                color="primary"
                page={currentPage}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn width="40%">USUÁRIO</TableColumn>
          <TableColumn width="25%">EMAIL</TableColumn>
          <TableColumn width="15%">CARGO</TableColumn>
          <TableColumn width="50%">CURSO</TableColumn>
          <TableColumn width="10%">AÇÕES</TableColumn>
        </TableHeader>
        <TableBody items={data}>
          {(user) => (
            <TableRow key={user.email}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    name={user.full_name}
                    size="sm"
                    src={user.avatar_url}
                  />
                  <span className="font-medium">{user.full_name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-small text-default-500">
                  {user.email}
                </span>
              </TableCell>
              <TableCell>
                <Chip
                  color={user.role === "ADMIN" ? "warning" : "default"}
                  size="sm"
                  variant="flat"
                >
                  {user.role === "ADMIN" ? "Admin" : "Usuário"}
                </Chip>
              </TableCell>
              <TableCell>
                <span className="text-small text-default-500">
                  {user.course?.name || "-"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    aria-label="Editar usuário"
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(user)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    isDisabled
                    isIconOnly
                    aria-label="Bloquear usuário"
                    color="danger"
                    size="sm"
                    variant="light"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <EditUserDialog
        isOpen={isOpen}
        user={selectedUser}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
