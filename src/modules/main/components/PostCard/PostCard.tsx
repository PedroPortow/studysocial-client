import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useToggleLike } from "../../hooks/mutations/useToggleLike";
import { useCommentsCount } from "../../hooks/queries/useCommentsCount";
import { useLikeStatus } from "../../hooks/queries/useLikeStatus";
import { useAuth } from "../../hooks/useAuth";
import { Post } from "../../types";

import { formatDate } from "@/utils";

type PostCardProps = {
  post: Post;
  isPressable?: boolean;
  onRemovePress?: (post: Post) => void;
};

const PostCard = memo(
  function PostCardImpl({
    post,
    isPressable = false,
    onRemovePress,
  }: PostCardProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: likeStatus } = useLikeStatus(post.id);
    const { data: commentsCount } = useCommentsCount(post.id);
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

    function handleComment() {
      navigate(`/posts/${post.id}?comment=true`);
    }

    console.log({ post });

    const _onRemovePress = () => onRemovePress?.(post);

    return (
      <Card
        className="w-full p-2 border border-default-200"
        isPressable={isPressable}
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
              onPress={_onRemovePress}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </CardHeader>
        <CardBody className="pt-0">
          <h3 className="font-semibold mb-2">{post.title}</h3>
          {post.content && (
            <p className="text-default-600 text-sm mb-3">{post.content}</p>
          )}
          {post.media_url && (
            <img
              alt={post.title}
              className="w-full rounded-lg object-cover max-h-96"
              src={post.media_url}
            />
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
          <Button
            isIconOnly
            color="default"
            size="sm"
            variant="light"
            onPress={handleComment}
          >
            <MessageCircle size={16} />
          </Button>
          {commentsCount !== undefined && commentsCount > 0 && (
            <span className="text-sm text-default-500">{commentsCount}</span>
          )}
        </CardFooter>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.post.id === nextProps.post.id &&
      prevProps.onRemovePress === nextProps.onRemovePress
    );
  },
);

export default PostCard;
