import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useCreatePost } from "../../hooks/mutations/useCreatePost";
import { useUserGroups } from "../../hooks/queries/useUserGroups";
import { postSchema } from "../../schemas/post";
import { CreatePostParams } from "../../types";

import FileInput from "@/components/FileInput/FileInput";

interface PostFormProps {
  societyId?: number;
  onClose?: () => void;
}

function PostForm({ societyId, onClose }: PostFormProps = {}) {
  const { data: userGroups } = useUserGroups();

  const { register, handleSubmit, watch, reset, setValue, control } =
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
    onClose?.();
  }

  function onSubmit(data: CreatePostParams) {
    const postData = {
      ...data,
      society_id: data.society_id ? Number(data.society_id) : null,
    };

    createPost(postData);
  }

  function handleMediaChange(file: File | null) {
    setValue("media", file);
  }

  const title = watch("title");
  const media = watch("media");

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Título"
        placeholder="Digite o título do post"
        variant="bordered"
        {...register("title")}
      />

      <Textarea
        label="Conteúdo"
        minRows={3}
        placeholder="No que você está pensando?"
        variant="bordered"
        {...register("content")}
      />

      {userGroups && userGroups.length > 0 && (
        <Controller
          control={control}
          name="society_id"
          render={({ field }) => (
            <Select
              label="Grupo"
              placeholder="Selecione um grupo (opcional)"
              selectedKeys={field.value ? [String(field.value)] : []}
              variant="bordered"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];

                field.onChange(selected ? Number(selected) : null);
              }}
            >
              {userGroups.map((group) => (
                <SelectItem key={group.id} textValue={group.name}>
                  {group.name}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      )}

      <div className="flex flex-row justify-between items-center pt-2">
        <FileInput value={media} onChange={handleMediaChange} />
        <div className="flex gap-2">
          {onClose && (
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
          )}
          <Button
            color="primary"
            isDisabled={!title || title.length === 0}
            isLoading={isPending}
            type="submit"
          >
            Postar
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
