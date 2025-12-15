import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";

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
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
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
      </CardHeader>
      <CardBody className="pt-0">
        <h3 className="font-semibold mb-1">{post.title}</h3>
        {post.content && (
          <p className="text-default-600 text-sm">{post.content}</p>
        )}
      </CardBody>
    </Card>
  );
}

export default PostCard;
