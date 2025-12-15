import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { postSchema } from "../../schemas/post";

import FileInput from "@/components/FileInput/FileInput";

type PostFormParams = {
  content: string;
  media?: File;
};

function PostForm() {
  const { register, handleSubmit, getValues, setValue } =
    useForm<PostFormParams>({
      defaultValues: {
        content: "",
        media: undefined,
      },
      resolver: zodResolver(postSchema),
    });

  const { content, media } = getValues();

  function onSubmit(data: PostFormParams) {
    console.log(data);
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        placeholder="No que você está pensando?"
        {...register("content")}
      />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <FileInput
            onChange={(files: FileList) => setValue("media", files[0])}
          />
          {media && (
            <img
              alt="Media"
              className="w-10 h-10 object-cover"
              src={URL.createObjectURL(media)}
            />
          )}
        </div>
        <Button
          color="primary"
          isDisabled={content?.length === 0}
          type="submit"
        >
          Postar
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
