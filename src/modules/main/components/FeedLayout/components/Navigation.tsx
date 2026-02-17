import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { BookOpen, Home, Plus, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@heroui/modal";

import { CreatePostDialog } from "../../CreatePostDialog/CreatePostDialog";

function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const menuItems = [
    { label: "Início", icon: Home, path: "/" },
    { label: "Grupos", icon: Users, path: "/grupos" },
    { label: "Diário", icon: BookOpen, path: "/diary" },
  ];

  return (
    <Card
      className="border-1 border-default-200 bg-background/60 sticky top-8"
      shadow="none"
    >
      <CardBody className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname.split("/")[1] === item.path.split("/")[1];

          const Icon = item.icon;

          return (
            <Button
              key={item.path}
              className={`justify-start gap-4 ${
                isActive
                  ? "font-semibold bg-primary/10 text-primary"
                  : "text-default-600"
              }`}
              size="lg"
              variant="light"
              onPress={() => navigate(item.path)}
            >
              <Icon fill={isActive ? "currentColor" : "none"} size={20} />
              {item.label}
            </Button>
          );
        })}

        <div className="h-px bg-default-100 my-2" />

        <CreatePostDialog isOpen={isOpen} onOpenChange={onOpenChange} />
        <Button
          className="justify-start gap-4 text-primary hover:bg-primary/10"
          size="lg"
          variant="light"
          onPress={onOpen}
        >
          <Plus size={20} />
          Novo Post
        </Button>
      </CardBody>
    </Card>
  );
}

export default Navigation;
