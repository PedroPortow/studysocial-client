import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../hooks/mutations/useRegister";
import { useCourses } from "../hooks/queries/useCourses";
import { registerSchema } from "../schemas";
import { RegisterFormData } from "../types";

function RegisterForm() {
  const navigate = useNavigate();
  const { data: courses, isPending: isLoadingCourses } = useCourses();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate: registerUser, isPending } = useRegister({
    onSuccess: () => {
      navigate("/login");
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      course: "",
      avatar: null,
    },
    resolver: zodResolver(registerSchema),
  });

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setValue("avatar", file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function onSubmit(data: RegisterFormData) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...registerData } = data;

    registerUser(registerData);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <label className="relative cursor-pointer group">
          <Avatar
            className="w-24 h-24"
            name="?"
            src={avatarPreview || undefined}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <input
            accept="image/*"
            className="hidden"
            type="file"
            onChange={handleAvatarChange}
          />
        </label>
      </div>
      <p className="text-center text-sm text-gray-500">
        Clique para adicionar foto
      </p>
      <Input
        errorMessage={errors.full_name?.message}
        isInvalid={Boolean(errors.full_name)}
        label="Nome completo"
        labelPlacement="outside"
        placeholder="Seu nome completo"
        {...register("full_name")}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={Boolean(errors.email)}
        label="Email institucional"
        labelPlacement="outside"
        placeholder="seu.email@inf.ufpel.edu.br"
        {...register("email")}
      />
      <Controller
        control={control}
        name="course"
        render={({ field }) => (
          <Select
            errorMessage={errors.course?.message}
            isInvalid={Boolean(errors.course)}
            isLoading={isLoadingCourses}
            label="Curso"
            labelPlacement="outside"
            placeholder="Selecione seu curso"
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];

              field.onChange(selected?.toString() || "");
            }}
          >
            {(courses || []).map((course) => (
              <SelectItem key={course.name}>{course.name}</SelectItem>
            ))}
          </Select>
        )}
      />
      <Input
        errorMessage={errors.password?.message}
        isInvalid={Boolean(errors.password)}
        label="Senha"
        labelPlacement="outside"
        placeholder="Mínimo 6 caracteres"
        type="password"
        {...register("password")}
      />
      <Input
        errorMessage={errors.confirm_password?.message}
        isInvalid={Boolean(errors.confirm_password)}
        label="Confirmar senha"
        labelPlacement="outside"
        placeholder="Digite a senha novamente"
        type="password"
        {...register("confirm_password")}
      />
      <Button
        className="mt-2"
        color="primary"
        isLoading={isPending}
        type="submit"
      >
        Criar conta
      </Button>
    </form>
  );
}

export default RegisterForm;
