import { useState } from "react"
import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Pagination } from "@heroui/pagination"
import { useDisclosure } from "@heroui/modal"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table"
import { Pencil, UserX } from "lucide-react"

import { EditBanDialog } from "../EditBanDialog/EditBanDialog"
import { useActiveBans } from "../../hooks/queries/useActiveBans"
import { useRevokeBan } from "../../hooks/mutations/useRevokeBan"

import { usePagination } from "@/hooks/usePagination"
import { type Ban, BanType } from "@/types/ban"
import { formatDate } from "@/utils"

const PER_PAGE = 4

export function BansTable() {
  const { data: bans } = useActiveBans()

  const [selectedBan, setSelectedBan] = useState<Ban | null>(null)

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure()

  const { mutate: revokeBan, isPending: isRevoking } = useRevokeBan()

  const { currentPage, totalPages, data, setPage } = usePagination({
    data: bans,
    perPage: PER_PAGE,
  })

  const handleEdit = (ban: Ban) => {
    setSelectedBan(ban)
    onEditOpen()
  }

  const handleRevoke = (banId: number) => {
    // deu preguiça, vai assim mesmo
    if (confirm("Tem certeza que deseja revogar este banimento?")) {
      revokeBan(banId)
    }
  }

  return (
    <>
      <Table
        aria-labelledby="bans-table"
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
          table: "w-full table-fixed",
          td: "overflow-hidden",
          th: "overflow-hidden",
          wrapper: "min-h-[400px] max-w-full overflow-x-hidden",
        }}
      >
        <TableHeader>
          <TableColumn width="30%">USUÁRIO</TableColumn>
          <TableColumn width="15%">TIPO</TableColumn>
          <TableColumn width="15%">EXPIRA EM</TableColumn>
          <TableColumn width="20%">MOTIVO</TableColumn>
          <TableColumn width="10%">BANIDO POR</TableColumn>
          <TableColumn width="10%">AÇÕES</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Nenhum usuário banido" items={data}>
          {(ban) => (
            <TableRow key={ban.id}>
              <TableCell className="max-w-0">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={ban.user.full_name}
                    size="sm"
                    src={ban.user.avatar_url}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span
                      className="block max-w-full truncate font-medium"
                      title={ban.user.full_name}
                    >
                      {ban.user.full_name}
                    </span>
                    <span
                      className="block max-w-full truncate text-xs text-default-400"
                      title={ban.user.email}
                    >
                      {ban.user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  color={ban.type === BanType.PERMANENT ? "danger" : "warning"}
                  size="sm"
                  variant="flat"
                >
                  {ban.type === BanType.PERMANENT ? "Permanente" : "Temporário"}
                </Chip>
              </TableCell>
              <TableCell className="max-w-0">
                <span
                  className="block max-w-full truncate text-small text-default-500"
                  title={ban.expiresAt ? formatDate(ban.expiresAt) : "-"}
                >
                  {ban.expiresAt ? formatDate(ban.expiresAt) : "-"}
                </span>
              </TableCell>
              <TableCell className="max-w-0">
                <span
                  className="block max-w-full truncate text-small text-default-500"
                  title={ban.reason || "Sem motivo especificado"}
                >
                  {ban.reason || "-"}
                </span>
              </TableCell>
              <TableCell className="max-w-0">
                <span
                  className="block max-w-full truncate text-small text-default-500"
                  title={ban.bannedBy}
                >
                  {ban.bannedBy}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    aria-label="Editar banimento"
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(ban)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Revogar banimento"
                    color="success"
                    isLoading={isRevoking}
                    size="sm"
                    variant="light"
                    onPress={() => handleRevoke(ban.id)}
                  >
                    <UserX size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <EditBanDialog
        ban={selectedBan}
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
      />
    </>
  )
}
