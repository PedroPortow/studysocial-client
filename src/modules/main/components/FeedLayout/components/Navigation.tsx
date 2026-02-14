import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { BookOpen, Home, LogOut, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/modules/main/hooks/useAuth";

function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

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
          const isActive = pathname.split('/')[1] === item.path.split('/')[1];

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

        <Button
          className="justify-start gap-4 text-danger hover:bg-danger/10"
          size="lg"
          variant="light"
          onPress={logout}
        >
          <LogOut size={20} />
          Sair
        </Button>
      </CardBody>
    </Card>
  );
}

export default Navigation;
