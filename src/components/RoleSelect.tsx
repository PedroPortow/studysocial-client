import { Select, SelectItem, SelectProps } from "@heroui/select";

import { ROLE } from "@/types/user";

interface RoleSelectProps
  extends Omit<SelectProps, "children" | "selectedKeys" | "onSelectionChange"> {
  value: ROLE;
  onValueChange: (role: ROLE) => void;
}

const ROLE_LABELS: Record<ROLE, string> = {
  [ROLE.USER]: "Usuário",
  [ROLE.ADMIN]: "Administrador",
};

export function RoleSelect({
  value,
  onValueChange,
  ...props
}: RoleSelectProps) {
  return (
    <Select
      label="Função"
      placeholder="Selecione a função"
      selectedKeys={[value]}
      variant="bordered"
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as ROLE;

        if (selected) onValueChange(selected);
      }}
      {...props}
    >
      {Object.values(ROLE).map((role) => (
        <SelectItem key={role} value={role}>
          {ROLE_LABELS[role]}
        </SelectItem>
      ))}
    </Select>
  );
}
