import { useEffect, useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Textarea } from "@heroui/input"
import { RadioGroup, Radio } from "@heroui/radio"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"

import { useUpdateBan } from "../../hooks/mutations/useUpdateBan"

import { Ban, BanType } from "@/types/ban"

type EditBanDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  ban: Ban | null
}

const BAN_DURATION_PRESETS = [
  { label: "1 Dia", hours: 24 },
  { label: "7 Dias", hours: 24 * 7 },
  { label: "30 Dias", hours: 24 * 30 },
]

type FormState = {
  reason: string
  banType: BanType
  customDate: string
}

const initialFormState: FormState = {
  reason: "",
  banType: BanType.TEMPORARY,
  customDate: "",
}

export function EditBanDialog({
  isOpen,
  onOpenChange,
  ban,
}: EditBanDialogProps) {
  const [form, setForm] = useState<FormState>(initialFormState)

  const { mutate: updateBan, isPending } = useUpdateBan({
    onSuccess: () => {
      onOpenChange(false)
    },
  })

  useEffect(() => {
    if (ban) {
      setForm({
        reason: ban.reason || "",
        banType: ban.type,
        customDate: ban.expiresAt
          ? new Date(ban.expiresAt).toISOString().slice(0, 16)
          : "",
      })
    }
  }, [ban])

  const handlePresetClick = (hours: number) => {
    const expiresAt = new Date()

    expiresAt.setHours(expiresAt.getHours() + hours)
    setForm((prev) => ({
      ...prev,
      customDate: expiresAt.toISOString().slice(0, 16),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ban) return

    const expiresAt =
      form.banType === BanType.TEMPORARY && form.customDate
        ? new Date(form.customDate).toISOString()
        : undefined

    updateBan({
      id: ban.id,
      data: {
        reason: form.reason.trim() || undefined,
        type: form.banType,
        expiresAt,
      },
    })
  }

  if (!ban) return null

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>Editar Banimento</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-default-100 rounded-lg">
                  <p className="text-sm text-default-600">
                    <span className="font-semibold">Usuário:</span>{" "}
                    {ban.user.full_name} ({ban.user.email})
                  </p>
                </div>

                <Textarea
                  label="Motivo (Opcional)"
                  placeholder="Digite o motivo do banimento"
                  value={form.reason}
                  variant="bordered"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, reason: e.target.value }))
                  }
                />

                <RadioGroup
                  label="Tipo de Banimento"
                  value={form.banType}
                  onValueChange={(value) => {
                    const newType = value as BanType

                    setForm((prev) => ({
                      ...prev,
                      banType: newType,
                      ...(newType === BanType.PERMANENT && { customDate: "" }),
                    }))
                  }}
                >
                  <Radio value={BanType.TEMPORARY}>Temporário</Radio>
                  <Radio value={BanType.PERMANENT}>Permanente</Radio>
                </RadioGroup>

                {form.banType === BanType.TEMPORARY && (
                  <>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-default-500">
                        Duração do Banimento
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {BAN_DURATION_PRESETS.map((preset) => (
                          <Button
                            key={preset.label}
                            size="sm"
                            variant="flat"
                            onPress={() => handlePresetClick(preset.hours)}
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Input
                      isRequired
                      label="Data de Expiração"
                      type="datetime-local"
                      value={form.customDate}
                      variant="bordered"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          customDate: e.target.value,
                        }))
                      }
                    />
                  </>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={
                  form.banType === BanType.TEMPORARY && !form.customDate
                }
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
  )
}
