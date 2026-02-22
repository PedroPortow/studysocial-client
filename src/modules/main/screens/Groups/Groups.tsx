import { Suspense, useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Plus, Search } from "lucide-react"

import FeedLayout from "../../components/FeedLayout/FeedLayout"
import GroupList from "../../components/GroupList/GroupList"
import { CreateGroupDialog } from "../../components/CreateGroupDialog/CreateGroupDialog"

function Groups() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const openDialog = () => setIsCreateDialogOpen(true)

  return (
    <FeedLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Grupos</h2>
            <span className="text-slate-500">
              Confira os grupos da universidade!
            </span>
          </div>
          <Button
            color="primary"
            startContent={<Plus size={18} />}
            onPress={openDialog}
          >
            Novo Grupo
          </Button>
        </div>

        <Input
          isClearable
          className="bg-white"
          placeholder="Pesquisar grupos por nome..."
          startContent={<Search className="text-default-400" size={18} />}
          value={searchTerm}
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <GroupList searchTerm={searchTerm} />
        </Suspense>
      </div>

      <CreateGroupDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </FeedLayout>
  )
}

export default Groups
