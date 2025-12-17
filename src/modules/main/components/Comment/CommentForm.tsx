import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateComment } from "../../hooks/mutations/useCreateComment";

const commentSchema = z.object({
  content: z.string().min(1, { message: "O comentário não pode estar vazio" }),
});

type CommentFormData = z.infer<typeof commentSchema>;

type CommentFormProps = {
  postId: number;
  parentId?: number | null;
  onSuccess?: () => void;
  autoFocus?: boolean;
};

const CommentForm = forwardRef<HTMLTextAreaElement, CommentFormProps>(
  function CommentForm({ postId, parentId = null, onSuccess, autoFocus = false }, ref) {
    const { register, handleSubmit, reset } = useForm<CommentFormData>({
      defaultValues: {
        content: "",
      },
      resolver: zodResolver(commentSchema),
    });

    const { mutate: createComment, isPending } = useCreateComment({
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });

    function onSubmit(data: CommentFormData) {
      createComment({
        postId,
        data: {
          content: data.content,
          parent_id: parentId,
        },
      });
    }

    const { ref: registerRef, ...registerRest } = register("content");

    return (
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          ref={(e) => {
            registerRef(e);
            if (ref && typeof ref === "function") {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
          }}
          autoFocus={autoFocus}
          placeholder={
            parentId ? "Escreva uma resposta..." : "Escreva um comentário..."
          }
          {...registerRest}
          minRows={2}
        />
        <div className="flex justify-end">
          <Button color="primary" isLoading={isPending} size="sm" type="submit">
            {parentId ? "Responder" : "Comentar"}
          </Button>
        </div>
      </form>
    );
  },
);

export default CommentForm;
