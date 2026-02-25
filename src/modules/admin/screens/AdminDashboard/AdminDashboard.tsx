import { Suspense } from "react"
import { Spinner } from "@heroui/spinner"
import { Button } from "@heroui/button"
import { useDisclosure } from "@heroui/modal"
import { ShieldBan } from "lucide-react"

import { UsersTable } from "../../components/UsersTable/UsersTable"
import { BansTable } from "../../components/BansTable/BansTable"
import { BanDialog } from "../../components/BanDialog/BanDialog"

import { Section } from "./components"

function AdminDashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center p-8">
      <div className="max-w-[80%] flex flex-col gap-8">
        <Section title="Usuários">
          <Suspense fallback={<Spinner size="lg" />}>
            <UsersTable />
          </Suspense>
        </Section>

        <Section
          RightContent={
            <Button
              color="danger"
              startContent={<ShieldBan size={16} />}
              onPress={onOpen}
            >
              Banir Usuário
            </Button>
          }
          title="Banimentos"
        >
          <Suspense fallback={<Spinner size="lg" />}>
            <BansTable />
          </Suspense>
        </Section>
      </div>

      <BanDialog isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}

export default AdminDashboard
