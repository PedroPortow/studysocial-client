import Comment from "@/modules/main/components/Comment/Comment";
import { useComments } from "@/modules/main/hooks/queries/useComments";

function CommentList({ postId }: { postId: number }) {
  const { data: comments } = useComments(postId);

  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
}

export default CommentList;
