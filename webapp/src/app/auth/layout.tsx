import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="container grid min-h-dvh place-items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
