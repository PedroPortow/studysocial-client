import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { Card, CardBody, CardHeader } from "@heroui/card"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal"
import { Trash2 } from "lucide-react"
import { useState } from "react"

import CommentForm from "../../components/Comment/CommentForm"
import { useDeleteComment } from "../../hooks/mutations/useDeleteComment"
import { useAuth } from "../../hooks/useAuth"
import { Comment as CommentType } from "../../types"

import { formatDate } from "@/utils"

type CommentProps = {
  comment: CommentType
  postId: number
  depth?: number
}

function Comment({ comment, postId, depth = 0 }: CommentProps) {
  const { user } = useAuth()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isReplying, setIsReplying] = useState(false)

  const { mutate: deleteComment, isPending } = useDeleteComment({
    onSuccess: () => onOpenChange(),
  })

  const isOwner = user?.email === comment.user.email

  return (
    <>
      <div
        className={
          depth > 0 ? "ml-6 mt-2 border-l-2 border-default-200 pl-4" : ""
        }
      >
        <Card shadow="none">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar
                name={comment.user.full_name}
                size="sm"
                src={comment.user.avatar_url}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  {comment.user.full_name}
                </p>
                <p className="text-xs text-default-500">
                  {formatDate(comment.created_at)}
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
                <Trash2 size={14} />
              </Button>
            )}
          </CardHeader>
          <CardBody className="pt-4">
            <p className="text-sm text-default-600">{comment.content}</p>
          </CardBody>
          <Button
            className="mt-2"
            size="sm"
            variant="light"
            onPress={() => setIsReplying(!isReplying)}
          >
            {isReplying ? "Cancelar" : "Responder"}
          </Button>
          {isReplying && (
            <div className="p-6">
              <CommentForm
                parentId={comment.id}
                postId={postId}
                onSuccess={() => setIsReplying(false)}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  postId={postId}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
      {/* TODO: criar um componente separado, por euqnato vai aqui mesmo... */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader>Excluir comentário</ModalHeader>
              <ModalBody>
                <p>Tem certeza que deseja excluir este comentário?</p>
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
                  onPress={() =>
                    deleteComment({ postId, commentId: comment.id })
                  }
                >
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Comment
