import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "react-router-dom";

import RegisterForm from "../../components/RegisterForm";

function RegisterScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 gap-8">
      <h1 className="text-2xl font-bold">Bem vindo ao StudySocial!</h1>
      <Card fullWidth className="max-w-md">
        <CardHeader>Cadastro</CardHeader>
        <CardBody>
          <RegisterForm />
        </CardBody>
        <CardFooter className="flex justify-center">
          <Link
            className="text-sm text-gray-500 hover:text-gray-700 self-center text-center"
            to={"/login"}
          >
            Já tem conta? Faça login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterScreen;
