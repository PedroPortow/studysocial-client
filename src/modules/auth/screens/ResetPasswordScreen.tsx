import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Input } from "@heroui/input"
import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom"

import { useResetPassword } from "../hooks/mutations/useResetPassword"
import { resetPasswordSchema } from "../schemas"
import { ResetPasswordFormData } from "../types"

import { useAuth } from "@/modules/main/hooks/useAuth"

function ResetPasswordScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const { user } = useAuth()

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess() {
      addToast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso. Faça login com a nova senha.",
        color: "success",
        timeout: 6000,
      })
      navigate("/login")
    },
    onError(error) {
      const axiosError = error as AxiosError
      const message =
        axiosError.response?.status === 400
          ? "Token inválido ou expirado. Solicite uma nova redefinição de senha."
          : "Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde."

      addToast({
        title: "Erro",
        description: message,
        color: "danger",
        timeout: 5000,
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: { password: "", confirm_password: "" },
    resolver: zodResolver(resetPasswordSchema),
  })

  if (user) return <Navigate replace to="/" />

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <h1 className="text-2xl font-bold">StudySocial</h1>
        <Card fullWidth className="max-w-md">
          <CardBody className="flex flex-col items-center gap-4 py-8">
            <p className="text-center text-gray-500">
              Link de redefinição inválido. Solicite um novo link na página de
              recuperação de senha.
            </p>
            <Link
              className="text-sm text-primary hover:underline"
              to="/recuperar-senha"
            >
              Solicitar novo link
            </Link>
          </CardBody>
        </Card>
      </div>
    )
  }

  const submit = (data: ResetPasswordFormData) =>
    resetPassword({ token, newPassword: data.password })

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">StudySocial</h1>
      <Card fullWidth className="max-w-md">
        <CardHeader>Redefinir Senha</CardHeader>
        <CardBody>
          <p className="text-sm text-gray-500 mb-4">
            Informe sua nova senha abaixo.
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submit)}
          >
            <Input
              errorMessage={errors.password?.message}
              isInvalid={Boolean(errors.password)}
              label="Nova senha"
              labelPlacement="outside"
              placeholder="Nova senha"
              type="password"
              {...register("password")}
            />
            <Input
              errorMessage={errors.confirm_password?.message}
              isInvalid={Boolean(errors.confirm_password)}
              label="Confirmar nova senha"
              labelPlacement="outside"
              placeholder="Confirmar nova senha"
              type="password"
              {...register("confirm_password")}
            />
            <Button
              className="w-full"
              color="primary"
              isLoading={isPending}
              type="submit"
            >
              Redefinir senha
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Link
            className="text-sm text-gray-500 hover:text-gray-700"
            to="/login"
          >
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ResetPasswordScreen
