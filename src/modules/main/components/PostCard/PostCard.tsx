import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Heart, MessageCircle, Trash2, Users } from "lucide-react";
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

    const isOwner = user?.email === post.user.email || user?.role === "ADMIN";
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
        className="w-full border-none bg-background/60 backdrop-blur-lg "
        isHoverable={isPressable}
        isPressable={isPressable}
        shadow="sm"
        onPress={viewPost}
      >
        <CardHeader className="flex justify-between pb-2">
          <div className="flex gap-3 items-center">
            <Avatar
              isBordered
              className="transition-transform hover:scale-105"
              color="primary"
              name={post.user.full_name}
              size="sm"
              src={post.user.avatar_url}
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-start leading-tight">
                {post.user.full_name}
              </p>
              <p className="text-xs text-default-500 text-start font-medium">
                {post.user.course?.name}
              </p>
              {post.society_name && (
                <Chip
                  className="mt-1"
                  color="primary"
                  size="sm"
                  startContent={<Users size={12} />}
                  variant="flat"
                >
                  {post.society_name}
                </Chip>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xs text-default-400 text-start">
              {formatDate(post.created_at)}
            </p>
            {isOwner && (
              <Button
                isIconOnly
                color="danger"
                size="sm"
                variant="light"
                onPress={_onRemovePress}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody className="py-2 gap-3">
          <h3 className="font-bold text-lg leading-tight">{post.title}</h3>
          {post.content && (
            <p className="text-default-600 text-sm whitespace-pre-wrap">
              {post.content}
            </p>
          )}
          {post.media_url && (
            <div className="relative group overflow-hidden rounded-xl bg-default-100">
              <img
                alt={post.title}
                className="w-full object-cover max-h-[500px] transition-transform duration-500 group-hover:scale-[1.02]"
                src={post.media_url}
              />
            </div>
          )}
        </CardBody>
        <CardFooter className="gap-4 pt-2">
          <div className="flex items-center gap-1 group/like">
            <Button
              isIconOnly
              className="group-hover/like:bg-danger/10 transition-colors"
              color={isLiked ? "danger" : "default"}
              isLoading={isLiking}
              radius="full"
              size="sm"
              variant={isLiked ? "flat" : "light"}
              onPress={handleLike}
            >
              <Heart
                className={
                  isLiked ? "fill-current" : "group-hover/like:text-danger"
                }
                size={18}
              />
            </Button>
            {likesCount > 0 && (
              <span
                className={`text-sm font-medium ${isLiked ? "text-danger" : "text-default-500 group-hover/like:text-danger"}`}
              >
                {likesCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 group/comment">
            <Button
              isIconOnly
              className="group-hover/comment:bg-primary/10 transition-colors"
              color="default"
              isDisabled={!isPressable}
              radius="full"
              size="sm"
              variant="light"
              onPress={handleComment}
            >
              <MessageCircle
                className="group-hover/comment:text-primary"
                size={18}
              />
            </Button>
            {commentsCount !== undefined && commentsCount > 0 && (
              <span className="text-sm font-medium text-default-500 group-hover/comment:text-primary">
                {commentsCount}
              </span>
            )}
          </div>
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
