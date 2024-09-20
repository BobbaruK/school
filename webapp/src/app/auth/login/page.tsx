import { LoginForm } from "@/components/auth/login-form";

interface Props {
  searchParams: {
    error: string;
    callbackUrl: string;
  };
}

const LoginPage = ({ searchParams: { error, callbackUrl } }: Props) => {
  return <LoginForm searchParamError={error} callbackUrl={callbackUrl} />;
};

export default LoginPage;
