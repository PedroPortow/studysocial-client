import { Suspense, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import FeedLayout from "../../components/FeedLayout/FeedLayout";
import GroupList from "../../components/GroupList/GroupList";
import { CreateGroupDialog } from "../../components/CreateGroupDialog/CreateGroupDialog";

function Groups() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openDialog = () => setIsCreateDialogOpen(true);

  return (
    <FeedLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Grupos</h2>
            <span className="text-slate-500">
              Confira os grupos da universidade! Entre em grupos bla bla
            </span>
          </div>
          <Button
            color="primary"
            onPress={openDialog}
          >
            Criar Grupo
          </Button>
        </div>

        <Input
          placeholder="Pesquisar grupos por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={<Search size={18} className="text-default-400" />}
          className="max-w-md"
          isClearable
          className="bg-white"
          variant="bordered"
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

export default Groups;
