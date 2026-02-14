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

        <GroupCard
          group={group}
          displayOwnerBadge
          onJoinPress={!isOwner && !isMember ? handleJoinGroup : undefined}
          onLeavePress={!isOwner && isMember ? handleLeaveGroup : undefined}
        />

        {(isMember || isOwner) && (
          <Card>
            <CardBody>
              <PostForm societyId={groupId} />
            </CardBody>
          </Card>
        )}

        <Suspense fallback={<Feed.Loader />}>
          <Feed societyId={groupId} />
        </Suspense>

      </div>
    </FeedLayout>
  );
}

export default GroupDetail;
