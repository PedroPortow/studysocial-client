import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreatePost } from "../../hooks/mutations/useCreatePost";
import { postSchema } from "../../schemas/post";
import { CreatePostParams } from "../../types";

import FileInput from "@/components/FileInput/FileInput";

function PostForm() {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<CreatePostParams>({
    defaultValues: {
      title: "",
      content: "",
        media: null,
    },
    resolver: zodResolver(postSchema),
  });

  const title = watch("title");
  const media = watch("media");

  const { mutate: createPost, isPending } = useCreatePost({
    onSuccess: () => {
      reset();
    },
  });

  function onSubmit(data: CreatePostParams) {
    createPost(data);
  }

  function handleMediaChange(file: File | null) {
    setValue("media", file);
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input placeholder="Título da postagem" {...register("title")} />
      <Textarea
        placeholder="No que você está pensando?"
        {...register("content")}
      />
      <div className="flex flex-row justify-between items-center">
        <FileInput value={media} onChange={handleMediaChange} />
        <Button
          color="primary"
          isDisabled={!title || title.length === 0}
          isLoading={isPending}
          type="submit"
        >
          Postar
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
