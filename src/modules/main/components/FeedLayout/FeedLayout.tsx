import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Plus } from "lucide-react";

import { CreatePostDialog } from "../CreatePostDialog/CreatePostDialog";

import Navigation from "./components/Navigation";

interface FeedLayoutProps {
  children: React.ReactNode;
  societyId?: number;
}

function FeedLayout({ children, societyId }: FeedLayoutProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950">
      <div className="flex justify-center w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 gap-8">
        <aside className="hidden md:block w-64 shrink-0 sticky top-8 h-fit">
          <Navigation />
        </aside>

        <main className="flex flex-col gap-6 w-full max-w-xl pb-20 md:pb-0 relative">
          {children}
        </main>

        <aside className="hidden lg:block w-80 shrink-0 sticky top-8 h-fit">
          {/*<div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-default-50 border border-default-100 min-h-[200px] flex items-center justify-center text-default-400 text-sm">
              * algo aqui *
            </div>
          </div>*/}
        </aside>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <Button
          className="shadow-lg transition-[width] duration-300 ease-in-out min-w-[3.5rem] w-14 hover:w-48 overflow-hidden p-0 justify-start group"
          color="primary"
          radius="full"
          size="lg"
          onPress={onOpen}
        >
          <div className="flex items-center h-full">
            <div className="w-14 h-full flex items-center justify-center shrink-0">
              <Plus size={24} />
            </div>
            <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 font-medium">
              Nova postagem
            </span>
          </div>
        </Button>
      </div>

      <CreatePostDialog
        isOpen={isOpen}
        societyId={societyId}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default FeedLayout;
