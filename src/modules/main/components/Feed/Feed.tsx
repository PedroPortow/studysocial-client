import { useDisclosure } from "@heroui/modal";
import { useCallback, useState } from "react";

import { usePosts } from "../../hooks/queries/usePosts";
import { Post } from "../../types";
import PostCard from "../PostCard/PostCard";
import { RemovePostModal } from "../RemovePostModal/RemovePostModal";

import Loader from "./Loader";

function Feed() {
  const { data: posts, isPending } = usePosts();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openRemovePostModal = useCallback(() => {
    (post: Post) => {
      setSelectedPost(post);
      onOpen();
    };
  }, [onOpen]);

  if (isPending) return <Loader />; // todo: botar um suspense na volta, me esqueci q n to no react antigo

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
        <PostCard key={post.id} post={post} onPress={openRemovePostModal} />
      ))}
      <RemovePostModal
        isOpen={isOpen}
        postId={selectedPost?.id}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default Feed;
