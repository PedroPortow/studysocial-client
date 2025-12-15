import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useDeletePost } from "../../hooks/mutations/useDeletePost";
import { useAuth } from "../../hooks/useAuth";
import { Post } from "../../types";

type PostCardProps = {
  post: Post;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const { mutate: deletePost, isPending } = useDeletePost({
    onSuccess: () => onOpenChange(),
  });

  const isOwner = user?.email === post.user.email;

  function viewPost() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <>
      <Card isHoverable isPressable className="w-full" onPress={viewPost}>
        <CardHeader className="flex justify-between">
          <div className="flex gap-3">
            <Avatar
              name={post.user.full_name}
              size="sm"
              src={post.user.avatar_url}
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{post.user.full_name}</p>
              <p className="text-xs text-default-500">
                {formatDate(post.created_at)}
              </p>
            </div>
          </div>
          {isOwner && (
            <Button
              isIconOnly
              color="danger"
              size="sm"
              variant="light"
              onPress={onOpen}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </CardHeader>
        <CardBody className="pt-0">
          <h3 className="font-semibold mb-1">{post.title}</h3>
          {post.content && (
            <p className="text-default-600 text-sm">{post.content}</p>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader>Excluir publicação</ModalHeader>
              <ModalBody>
                <p>Tem certeza que deseja excluir esta publicação?</p>
                <p className="text-sm text-default-500">
                  Esta ação não pode ser desfeita.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  onPress={() => deletePost(post.id)}
                >
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostCard;
