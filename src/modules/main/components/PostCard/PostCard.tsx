import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useToggleLike } from "../../hooks/mutations/useToggleLike";
import { useLikeStatus } from "../../hooks/queries/useLikeStatus";
import { useAuth } from "../../hooks/useAuth";
import { Post } from "../../types";

import { formatDate } from "@/utils";

type PostCardProps = {
  post: Post;
  onPress?: (post: Post) => void;
};

const PostCard = memo(
  function PostCardImpl({ post, onPress }: PostCardProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: likeStatus } = useLikeStatus(post.id);
    const { mutate: toggleLike, isPending: isLiking } = useToggleLike();

    const isOwner = user?.email === post.user.email;
    const isLiked = likeStatus?.is_liked ?? false;
    const likesCount = likeStatus?.likes_count ?? 0;

    function viewPost() {
      navigate(`/posts/${post.id}`);
    }

    function handleLike() {
      toggleLike(post.id);
    }

    const _onPress = () => onPress?.(post);

    return (
      <Card
        isPressable
        className="w-full p-2 border border-default-200"
        shadow="none"
        onPress={viewPost}
      >
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
              size="md"
              variant="light"
              onPress={_onPress}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </CardHeader>
        <CardBody className="pt-0">
          <h3 className="font-semibold mb-4">{post.title}</h3>
          {post.content && (
            <p className="text-default-600 text-sm">{post.content}</p>
          )}
        </CardBody>
        <CardFooter className="gap-1">
          <Button
            isIconOnly
            color={isLiked ? "danger" : "default"}
            isLoading={isLiking}
            size="sm"
            variant={isLiked ? "flat" : "light"}
            onPress={handleLike}
          >
            <Heart fill={isLiked ? "currentColor" : "none"} size={16} />
          </Button>
          {likesCount > 0 && (
            <span className="text-sm text-default-500">{likesCount}</span>
          )}
          <Button isIconOnly color="default" size="sm" variant="light">
            <MessageCircle size={16} />
          </Button>
        </CardFooter>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.post.id === nextProps.post.id &&
      prevProps.onPress === nextProps.onPress
    );
  },
);

export default PostCard;
