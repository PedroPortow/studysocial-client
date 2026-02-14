import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "@/types";
import { Card, CardBody, CardFooter, CardHeader, CardProps } from "@heroui/card";
import { Button } from "@heroui/button";
import { Plus, Trash, Users, X } from "lucide-react";
import { useCurrentUser } from "../../../../hooks/queries/useCurrentUser";
import { DeleteGroupDialog } from "../../../DeleteGroupDialog/DeleteGroupDialog";
import { is } from "zod/v4/locales";

interface GroupCardProps extends CardProps {
  group: Group;
  onJoinPress: () => void;
  onLeavePress: () => void;
}

function GroupCard({ group, onJoinPress, onLeavePress, isPressable, ...rest }: GroupCardProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: currentUser } = useCurrentUser({ enabled: true });

  const isOwner = currentUser?.email === group.owner.email;
  const isAdmin = currentUser?.role === "ADMIN";
  const canDelete = isOwner || isAdmin;

  const handleCardClick = () => {
    navigate(`/grupos/${group.id}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const join = () => { console.log("oi") }

  const leave = () => { console.log("oi") }

  return (
    <>
      <Card
        {...rest}
        isPressable={isPressable}
        onPress={handleCardClick}
        className={`w-full ${isPressable ? 'hover:scale-[1.01] transition-transform' : ''}`}
      >
        <CardHeader className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-start">{group.name}</h3>
            <p className="text-slate-400 text-start">
              {group?.description}
            </p>
          </div>
          {canDelete || onJoinPress || onLeavePress
            ? <div className="flex flex-row">
                {canDelete && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={handleDelete}
                      startContent={
                        <Trash className="w-4 h-4" />
                      }
                    >
                      Excluir
                    </Button>
                  </div>
                )}
                {onJoinPress && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      color="primary"
                      variant="light"
                      onPress={join}
                      startContent={
                        <Plus className="w-4 h-4" />
                      }
                    >
                      Entrar
                    </Button>
                  </div>
                )}
                {onLeavePress && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={leave}
                      startContent={
                        <X className="w-4 h-4" />
                      }
                    >
                      Sair
                    </Button>
                  </div>
                )}
              </div>
            : null
          }
        </CardHeader>
        <CardBody>

        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex items-center gap-1 text-sm text-default-500">
            <Users size={16} />
            <span>{group.member_count ?? 0} {group.member_count === 1 ? 'membro' : 'membros'}</span>
          </div>
        </CardFooter>
      </Card>

      <DeleteGroupDialog
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        groupId={group.id}
        groupName={group.name}
      />
    </>
  );
}

export default GroupCard;
