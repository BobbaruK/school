import { NewPasswordForm } from "@/components/auth/new-password-form";
import React from "react";

interface Props {
  searchParams: {
    token: string;
  };
}

const NewPasswordPage = ({ searchParams: { token } }: Props) => {
  return <NewPasswordForm searchParamToken={token} />;
};

export default NewPasswordPage;
