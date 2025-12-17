import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">Bem vindo ao StudySocial!</h1>
      <Card fullWidth className="max-w-md">
        <CardHeader>Login</CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
        <CardFooter className="flex justify-center">
          <Link
            className="text-sm text-gray-500 hover:text-gray-700 self-center text-center"
            to={"/registrar"}
          >
            Não tem conta? Faça seu cadastro
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginScreen;
