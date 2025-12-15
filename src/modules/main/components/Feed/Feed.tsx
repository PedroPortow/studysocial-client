import { usePosts } from "../../hooks/queries/usePosts";
import PostCard from "../PostCard/PostCard";

import Loader from "./Loader";

function Feed() {
  const { data: posts, isPending } = usePosts();

  if (isPending) return <Loader />;

  if (!posts || posts.length === 0) {
    // todo: fazer um componente de empty state global e arrumar isso aq
    return (
      <div className="flex justify-center py-8">
        <p className="text-default-500">Nenhuma publicação encontrada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
