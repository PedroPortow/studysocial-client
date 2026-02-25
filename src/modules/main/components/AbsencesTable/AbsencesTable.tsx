import { useState } from "react"
import { Button } from "@heroui/button"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table"
import { Pencil, Trash2 } from "lucide-react"

import { useAbsences } from "../../hooks/queries/useAbsences"
import { useDeleteAbsence } from "../../hooks/mutations/useDeleteAbsence"
import { Absence } from "../../types"
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog"

import { AbsenceDialog } from "./components/AbsenceDialog"

type AbsencesTableProps = {
  subjectId: number
  isCreateOpen?: boolean
  onCreateOpenChange?: (open: boolean) => void
}

function formatDate(iso: string) {
  try {
    const [y, m, d] = iso.split("-").map(Number)

    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return iso

    return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  } catch {
    return iso
  }
}

export function AbsencesTable({
  subjectId,
  isCreateOpen = false,
  onCreateOpenChange,
}: AbsencesTableProps) {
  const { data: absences = [], isPending } = useAbsences({ subjectId })
  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [absenceToDelete, setAbsenceToDelete] = useState<Absence | null>(null)

  const isCreateControlled = onCreateOpenChange != null
  const isDialogOpenState = isDialogOpen || (isCreateControlled && isCreateOpen)

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setSelectedAbsence(null)
      setIsDialogOpen(false)
      if (isCreateControlled) onCreateOpenChange?.(false)
    } else {
      setIsDialogOpen(true)
    }
  }

  const { mutate: deleteAbsence, isPending: isDeleting } = useDeleteAbsence({
    onSuccess: () => setAbsenceToDelete(null),
  })

  const totalAbsences = absences.reduce((sum, a) => sum + a.quantity, 0)

  const handleEdit = (absence: Absence) => {
    setSelectedAbsence(absence)
    setIsDialogOpen(true)
  }

  if (isPending) {
    return (
      <div className="text-default-500 text-center py-6">
        Carregando faltas...
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-default-600">
            <span className="font-semibold text-foreground">
              Total de faltas nesta disciplina:
            </span>{" "}
            {totalAbsences}
          </p>
        </div>

        {absences.length === 0 ? (
          <div className="text-center text-default-500 py-8 border border-dashed border-default-200 rounded-lg">
            Nenhuma falta registrada. Clique em &quot;Nova Falta&quot; para
            registrar.
          </div>
        ) : (
          <Table aria-label="Faltas da disciplina">
            <TableHeader>
              <TableColumn>DATA</TableColumn>
              <TableColumn>QUANTIDADE</TableColumn>
              <TableColumn>MOTIVO</TableColumn>
              <TableColumn align="end" width={120}>
                AÇÕES
              </TableColumn>
            </TableHeader>
            <TableBody items={absences}>
              {(absence) => (
                <TableRow key={absence.id}>
                  <TableCell>{formatDate(absence.date)}</TableCell>
                  <TableCell>{absence.quantity}</TableCell>
                  <TableCell>
                    <span className="text-default-500">
                      {absence.reason || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        isIconOnly
                        aria-label="Editar falta"
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(absence)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label="Excluir falta"
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => setAbsenceToDelete(absence)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <AbsenceDialog
        absence={selectedAbsence}
        isOpen={isDialogOpenState}
        subjectId={subjectId}
        onOpenChange={handleDialogChange}
      />

      <ConfirmDialog
        confirmLabel="Excluir Falta"
        description={
          absenceToDelete
            ? `Excluir o registro de ${absenceToDelete.quantity} falta(s) em ${formatDate(absenceToDelete.date)}?`
            : ""
        }
        isLoading={isDeleting}
        isOpen={!!absenceToDelete}
        title="Excluir Falta"
        onConfirm={() => absenceToDelete && deleteAbsence(absenceToDelete.id)}
        onOpenChange={(open) => !open && setAbsenceToDelete(null)}
      />
    </>
  )
}
