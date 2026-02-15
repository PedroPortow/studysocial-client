import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Pencil } from "lucide-react";

import { useCreatePost } from "../../hooks/mutations/useCreatePost";
import { postSchema } from "../../schemas/post";
import { CreatePostParams } from "../../types";

import FileInput from "@/components/FileInput/FileInput";

interface PostFormProps {
  societyId?: number;
}

function PostForm({ societyId }: PostFormProps = {}) {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<CreatePostParams>({
      defaultValues: {
        title: "",
        content: "",
        media: null,
        society_id: societyId || null,
      },
      resolver: zodResolver(postSchema),
    });

  const { mutate: createPost, isPending } = useCreatePost({ onSuccess });

  function onSuccess() {
    reset({
      title: "",
      content: "",
      media: null,
      society_id: societyId || null,
    });
  }

  function onSubmit(data: CreatePostParams) {
    const postData = {
      ...data,
      society_id: societyId || null,
    };

    createPost(postData);
  }

  function handleMediaChange(file: File | null) {
    setValue("media", file);
  }

  const title = watch("title");
  const media = watch("media");

  return (
    <Card className="p-2 border-1 border-default-200" shadow="none">
      <CardHeader className="flex flex-row items-center gap-2 text-md font-medium text-start">
        <Pencil className="text-primary" size={16} />
        <span>Nova Postagem</span>
      </CardHeader>
      <CardBody>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Digite o título da postagem"
            {...register("title")}
          />
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
      </CardBody>
    </Card>
  );
}

export default PostForm;
