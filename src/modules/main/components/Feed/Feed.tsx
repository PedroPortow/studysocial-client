import { useDisclosure } from "@heroui/modal"
import { useCallback, useState } from "react"

import { usePosts } from "../../hooks/queries/usePosts"
import { Post } from "../../types"
import PostCard from "../PostCard/PostCard"
import { RemovePostModal } from "../RemovePostModal/RemovePostModal"

import Loader from "./Loader"

interface FeedProps {
  societyId?: number
}

function Feed({ societyId }: FeedProps = {}) {
  const { data: posts } = usePosts({ societyId })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const openRemovePostModal = useCallback(
    (post: Post) => {
      setSelectedPost(post)
      onOpen()
    },
    [setSelectedPost, onOpen],
  )

  if (!posts || posts.length === 0) {
    // todo: fazer um componente de empty state global e arrumar isso aq
    return (
      <div className="flex justify-center py-8">
        <p className="text-default-500">Nenhuma publicação encontrada</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          isPressable
          post={post}
          onRemovePress={openRemovePostModal}
        />
      ))}
      <RemovePostModal
        isOpen={isOpen}
        postId={selectedPost?.id}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

Feed.Loader = Loader

export default Feed
