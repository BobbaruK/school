"use client";

import { newVerification } from "@/actions";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
  searchParamToken: string;
}

export const NewVerificationForm = ({ searchParamToken }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!searchParamToken) {
      setError("Missing token!");
      return;
    }

    newVerification(searchParamToken)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [searchParamToken, success, error]);

  useEffect(() => {
    onSubmit();

    return () => {};
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={"Confirming your verification"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <div className="flex items-center justify-center">
        {!success && !error && <BeatLoader color="currentColor" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
