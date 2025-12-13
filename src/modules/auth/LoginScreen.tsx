import { Card, CardBody, CardHeader } from "@heroui/card";

import LoginForm from "./components/LoginForm";

function LoginScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-2xl font-bold">Bem vindo ao StudySocial!</h1>
      <Card fullWidth className="max-w-md">
        <CardHeader>Login</CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginScreen;
