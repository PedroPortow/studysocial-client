import { Button } from "@heroui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { Input } from "@heroui/input"
import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { Link, Navigate, useNavigate } from "react-router-dom"

import { useForgotPassword } from "../hooks/mutations/useForgotPassword"
import { forgotPasswordSchema } from "../schemas"
import { ForgotPasswordParams } from "../types"

import { useAuth } from "@/modules/main/hooks/useAuth"

function ForgotPasswordScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const { mutate: sendResetEmail, isPending } = useForgotPassword({
    onSuccess() {
      addToast({
        title: "Email enviado!",
        description:
          "Se o email estiver cadastrado, você receberá um link para redefinir sua senha.",
        color: "success",
        timeout: 6000,
      })
      navigate("/login")
    },
    onError(error) {
      const axiosError = error as AxiosError

      addToast({
        title: "Erro",
        description:
          axiosError.response?.status === 400
            ? "Verifique o email informado e tente novamente."
            : "Ocorreu um erro ao enviar o email. Tente novamente mais tarde.",
        color: "danger",
        timeout: 5000,
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordParams>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  })

  if (user) return <Navigate replace to="/" />

  const submit = (data: ForgotPasswordParams) => sendResetEmail(data)

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">StudySocial</h1>
      <Card fullWidth className="max-w-md">
        <CardHeader>Recuperar Senha</CardHeader>
        <CardBody>
          <p className="text-sm text-gray-500 mb-4">
            Informe seu email e enviaremos um link para redefinir sua senha.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
            <Input
              errorMessage={errors.email?.message}
              isInvalid={Boolean(errors.email)}
              label="Email"
              labelPlacement="outside"
              placeholder="seu.email@inf.ufpel.edu.br"
              {...register("email")}
            />
            <Button
              className="w-full"
              color="primary"
              isLoading={isPending}
              type="submit"
            >
              Enviar link de recuperação
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

export default ForgotPasswordScreen
