import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError, AxiosResponse } from "axios"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { useLogin } from "../hooks/mutations/useLogin"
import { loginSchema } from "../schemas"
import { loginParams, LoginResponse } from "../types"

import { Ban, BanType } from "@/types/ban"
import { formatDate } from "@/utils"
import { useAuth } from "@/modules/main/hooks/useAuth"

function LoginForm() {
  const navigate = useNavigate()
  const { login: setAuth } = useAuth()

  function onSuccess(response: AxiosResponse<LoginResponse>) {
    setAuth(response.data.token, response.data.user)
    navigate("/")
  }

  function onError(error: AxiosError) {
    if (error.response?.status === 403 && error.response?.data) {
      const ban = error.response.data as Ban

      let description = ""

      if (ban.type === BanType.PERMANENT) {
        description = "Sua conta foi banida permanentemente."
      } else if (ban.expiresAt) {
        description = `Sua conta foi banida até ${formatDate(ban.expiresAt)}.`
      }

      if (ban.reason) {
        description += `\n\nMotivo: ${ban.reason}`
      }

      console.log("eae")

      addToast({
        title: "Você foi banido!",
        description,
        color: "danger",
        timeout: 8000,
      })
    }
  }

  const { mutate: login, isPending } = useLogin({ onSuccess, onError })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginParams>({
    defaultValues: {
      email: "admin@inf.ufpel.edu.br",
      password: "123456",
    },
    resolver: zodResolver(loginSchema),
  })

  const submit = (data: loginParams) => login(data)

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
  )
}

export default LoginForm
