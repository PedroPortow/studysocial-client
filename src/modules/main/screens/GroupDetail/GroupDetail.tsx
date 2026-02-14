import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import FeedLayout from "../../components/FeedLayout/FeedLayout";
import { useGroup } from "../../hooks/queries/useGroup";
import { useCurrentUser } from "../../hooks/queries/useCurrentUser";
import { useJoinGroup } from "../../hooks/mutations/useJoinGroup";
import { useLeaveGroup } from "../../hooks/mutations/useLeaveGroup";
import Feed from "../../components/Feed/Feed";
import { Suspense } from "react";
import PostForm from "../../components/PostForm/PostForm";

function GroupDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const groupId = Number(id);

  const { data: group, isPending } = useGroup(groupId);
  const { data: currentUser } = useCurrentUser({ enabled: true });
  const { mutate: joinGroup, isPending: isJoining } = useJoinGroup();
  const { mutate: leaveGroup, isPending: isLeaving } = useLeaveGroup();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!group) {
    return <div>Grupo não encontrado</div>;
  }

  const isOwner = currentUser?.email === group.owner.email;
  const isMember = group.is_member;

  const handleJoinGroup = () => {
    joinGroup(groupId);
  };

  const handleLeaveGroup = () => {
    leaveGroup(groupId);
  };

  return (
    <FeedLayout>
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <Button
          className="w-fit"
          startContent={<ArrowLeft size={16} />}
          variant="ghost"
          onPress={() => navigate("/grupos")}
        >
          Voltar
        </Button>

        <Card>
          <CardHeader className="flex flex-col items-start gap-2">
            <div className="flex w-full justify-between items-start">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{group.name}</h1>
                <p className="text-sm text-default-500">
                  Criado por {group.owner.full_name}
                </p>
                <div className="flex items-center gap-1 text-sm text-default-500 mt-1">
                  <Users size={16} />
                  <span>
                    {group.member_count}{" "}
                    {group.member_count === 1 ? "membro" : "membros"}
                  </span>
                </div>
              </div>

              {/* Mostrar botões apenas se não for o dono */}
              {!isOwner && (
                <div className="flex gap-2">
                  {!isMember ? (
                    <Button
                      color="primary"
                      onPress={handleJoinGroup}
                      isLoading={isJoining}
                    >
                      Entrar no Grupo
                    </Button>
                  ) : (
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleLeaveGroup}
                      isLoading={isLeaving}
                    >
                      Sair do Grupo
                    </Button>
                  )}
                </div>
              )}

              {/* Badge para indicar se é membro */}
              {isOwner && (
                <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  Dono do Grupo
                </div>
              )}
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              {group.description || "Sem descrição"}
            </p>
          </CardBody>
        </Card>

        {/* Só permite postar se for membro ou dono */}
        {(isMember || isOwner) && <PostForm societyId={groupId} />}
        
        <Suspense fallback={<Feed.Loader />}>
          <Feed societyId={groupId} />
        </Suspense>

      </div>
    </FeedLayout>
  );
}

export default GroupDetail;
