import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown"
import { ChevronDown } from "lucide-react"

import { useAuth } from "../../../hooks/useAuth"

function UserDropdown() {
  const { user, logout } = useAuth()

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          className="flex items-center gap-2 pl-2 pr-1 py-1 h-auto min-w-0 hover:bg-white/50"
          variant="light"
        >
          <div className="hidden md:flex flex-col items-end mr-1">
            <span className="text-sm font-medium text-slate-700 leading-tight">
              {user?.full_name}
            </span>
          </div>
          <Avatar size="sm" src={user?.avatar_url} />
          <ChevronDown className="text-slate-400 hidden md:block" size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menu do usuário">
        <DropdownSection>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            onPress={logout}
          >
            Sair
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown
