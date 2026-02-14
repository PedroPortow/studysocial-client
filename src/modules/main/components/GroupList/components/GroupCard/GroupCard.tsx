import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "@/types";
import { Card, CardBody, CardFooter, CardHeader, CardProps } from "@heroui/card";
import { Button } from "@heroui/button";
import { Plus, Trash, Users, X } from "lucide-react";
import { useCurrentUser } from "../../../../hooks/queries/useCurrentUser";
import { DeleteGroupDialog } from "../../../DeleteGroupDialog/DeleteGroupDialog";
interface GroupCardProps extends CardProps {
  group: Group;
  displayOwnerBadge: boolean;
  onJoinPress?: () => void;
  onLeavePress?: () => void;
}

function GroupCard({ group, onJoinPress, onLeavePress, isPressable, displayOwnerBadge, ...rest }: GroupCardProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: currentUser } = useCurrentUser({ enabled: true });

  const isOwner = currentUser?.email === group.owner.email;
  const isAdmin = currentUser?.role === "ADMIN";
  const isMember = group.is_member;
  const canDelete = isOwner || isAdmin;

  const handleCardClick = () => {
    navigate(`/grupos/${group.id}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Card
        {...rest}
        isPressable={isPressable}
        onPress={handleCardClick}
        shadow="none"
        className={`w-full p-3 border border-default-200 ${isPressable ? 'hover:scale-[1.01] transition-transform' : ''}`}
      >
        <CardHeader className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-start">{group.name}</h3>
            <p className="text-slate-400 text-start">
              {group?.description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {displayOwnerBadge && isOwner && (
              <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Dono do Grupo
              </div>
            )}
            {!isOwner && isMember && (
              <div className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm">
                Membro
              </div>
            )}
            {(canDelete || onJoinPress || onLeavePress) && (
              <div className="flex flex-row gap-2">
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
                      onPress={onJoinPress}
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
                      onPress={onLeavePress}
                      startContent={
                        <X className="w-4 h-4" />
                      }
                    >
                      Sair do grupo
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
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
