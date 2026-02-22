import { Controller, useForm } from "react-hook-form"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import { Textarea } from "@heroui/input"
import { RadioGroup, Radio } from "@heroui/radio"
import { Spinner } from "@heroui/spinner"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"
import { useQuery } from "@tanstack/react-query"

import { getUsers } from "../../services/users"
import { useBanUser } from "../../hooks/mutations/useBanUser"

import { BanType } from "@/types/ban"
import RESOURCES from "@/constants/resources"

type BanDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type BanFormValues = {
  userId: string
  reason: string
  banType: BanType
  customDate: string
}

const BAN_DURATION_PRESETS = [
  { label: "1 Dia", hours: 24 },
  { label: "7 Dias", hours: 24 * 7 },
  { label: "30 Dias", hours: 24 * 30 },
]

export function BanDialog({ isOpen, onOpenChange }: BanDialogProps) {
  // cansei de escrever hooks....................
  const { data: response, isLoading } = useQuery({
    queryKey: [RESOURCES.USERS],
    queryFn: getUsers,
    enabled: isOpen,
  })
  const users = response?.data || []

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<BanFormValues>({
    defaultValues: {
      userId: "",
      reason: "",
      banType: BanType.TEMPORARY,
      customDate: "",
    },
  })

  const selectedBanType = watch("banType")
  const selectedCustomDate = watch("customDate")
  const selectedUserId = watch("userId")

  const { mutate: banUser, isPending } = useBanUser({
    onSuccess: () => {
      onOpenChange(false)
      reset()
    },
  })

  const handlePresetClick = (hours: number) => {
    const expiresAt = new Date()

    expiresAt.setHours(expiresAt.getHours() + hours)
    setValue("customDate", expiresAt.toISOString().slice(0, 16), {
      shouldValidate: true,
    })
  }

  const onSubmit = (formData: BanFormValues) => {
    const expiresAt =
      formData.banType === BanType.TEMPORARY && formData.customDate
        ? new Date(formData.customDate).toISOString()
        : undefined

    banUser({
      userId: formData.userId,
      reason: formData.reason.trim() || undefined,
      type: formData.banType,
      expiresAt,
    })
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose: () => void) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Banir Usuário</ModalHeader>
            <ModalBody>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="userId"
                    render={({ field }) => (
                      <Select
                        isRequired
                        errorMessage={errors.userId?.message}
                        isInvalid={Boolean(errors.userId)}
                        label="Usuário"
                        placeholder="Selecione o usuário"
                        selectedKeys={field.value ? [field.value] : []}
                        variant="bordered"
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0]

                          field.onChange(selected as string)
                        }}
                      >
                        {users.map((user) => (
                          <SelectItem
                            key={user.email}
                            textValue={user.full_name}
                          >
                            {user.full_name} ({user.email})
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    rules={{ required: "Selecione um usuário" }}
                  />

                  <Controller
                    control={control}
                    name="reason"
                    render={({ field }) => (
                      <Textarea
                        label="Motivo (Opcional)"
                        placeholder="Digite o motivo do banimento"
                        value={field.value}
                        variant="bordered"
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="banType"
                    render={({ field }) => (
                      <RadioGroup
                        label="Tipo de Banimento"
                        value={field.value}
                        onValueChange={(value) => {
                          const newType = value as BanType

                          field.onChange(newType)
                          if (newType === BanType.PERMANENT) {
                            setValue("customDate", "", { shouldValidate: true })
                          }
                        }}
                      >
                        <Radio value={BanType.TEMPORARY}>Temporário</Radio>
                        <Radio value={BanType.PERMANENT}>Permanente</Radio>
                      </RadioGroup>
                    )}
                  />

                  {selectedBanType === BanType.TEMPORARY && (
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
                              type="button"
                              variant="flat"
                              onPress={() => handlePresetClick(preset.hours)}
                            >
                              {preset.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Controller
                        control={control}
                        name="customDate"
                        render={({ field }) => (
                          <Input
                            isRequired
                            errorMessage={errors.customDate?.message}
                            isInvalid={Boolean(errors.customDate)}
                            label="Data de Expiração"
                            type="datetime-local"
                            value={field.value}
                            variant="bordered"
                            onChange={field.onChange}
                          />
                        )}
                        rules={{
                          validate: (value) =>
                            Boolean(value) || "Selecione a data de expiração",
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                isDisabled={
                  !selectedUserId ||
                  (selectedBanType === BanType.TEMPORARY && !selectedCustomDate)
                }
                isLoading={isPending}
                type="submit"
              >
                Banir Usuário
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
