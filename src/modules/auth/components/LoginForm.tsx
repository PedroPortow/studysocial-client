import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../schemas";
import { LoginRequest } from "../types";

function LoginForm() {
  const navigate = useNavigate();

  function onSuccess() {
    // navigate("/feed");
  }
  const { mutate: login, isPending } = useLogin({
    onSuccess,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "admin@inf.ufpel.edu.br",
      password: "123465",
    },
    resolver: zodResolver(loginSchema),
  });

  const submit = (data: LoginRequest) => {
    login(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
      <Input
        errorMessage={errors.email?.message}
        isInvalid={Boolean(errors.email)}
        label="Email"
        labelPlacement="outside"
        placeholder="Email"
        {...register("email")}
      />
      <Input
        errorMessage={errors.password?.message}
        isInvalid={Boolean(errors.password)}
        label="Senha"
        labelPlacement="outside"
        placeholder="Senha"
        {...register("password")}
      />
      <div className="flex flex-row justify-between items-center">
        <Link
          className="text-sm text-gray-500 hover:text-gray-700"
          to={"/recuperar-senha"} // adicionar essa telinha
        >
          Esqueci minha senha
        </Link>
        <Button
          className="self-end w-24"
          color="primary"
          isLoading={isPending}
          type="submit"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
