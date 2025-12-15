import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

function Navigation() {
  return (
    <Card className="border-1 border-default-200 min-w-48 h-fit" shadow="none">
      <CardBody className="flex flex-col gap-2">
        <Button color="default" color="primary">
          Início
        </Button>
        <Button color="default" color="primary">
          Grupos
        </Button>
        <Button color="default" color="primary">
          Diário Acadêmico
        </Button>
      </CardBody>
    </Card>
  );
}

export default Navigation;
