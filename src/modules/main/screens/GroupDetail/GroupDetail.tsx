import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import FeedLayout from "../../components/FeedLayout/FeedLayout";
import { useGroup } from "../../hooks/queries/useGroup";
import { useCurrentUser } from "../../hooks/queries/useCurrentUser";
import { useJoinGroup } from "../../hooks/mutations/useJoinGroup";
import { useLeaveGroup } from "../../hooks/mutations/useLeaveGroup";
import { GroupCard } from "../../components/GroupList/components";

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
  // tem q saber o membership aquio pra ver se ja faz parte etc

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
{/*
        <Card>
          <CardHeader className="flex flex-col items-start gap-2">
            <div className="flex w-full justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{group.name}</h1>
                <p className="text-sm text-default-500">
                  Criado por {group.owner.full_name}
                </p>
              </div>
              {!isOwner && (
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    onPress={() => joinGroup(groupId)}
                    isLoading={isJoining}
                  >
                    Entrar
                  </Button>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => leaveGroup(groupId)}
                    isLoading={isLeaving}
                  >
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-700">
              {group.description || "Sem descrição"}
            </p>
          </CardBody>
        </Card>*/}


        <GroupCard group={group} onJoinPress={() => "eae"} />
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Publicações do Grupo</h2>
          <p className="text-default-500">
            As publicações do grupo serão exibidas aqui.
          </p>
        </div>
      </div>
    </FeedLayout>
  );
}

export default GroupDetail;
