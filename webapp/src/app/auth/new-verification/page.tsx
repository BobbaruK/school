import { NewVerificationForm } from "@/components/auth/new-verification-form";
interface Props {
  searchParams: {
    token: string;
  };
}

const NewVerificationPage = ({ searchParams: { token } }: Props) => {
  return <NewVerificationForm searchParamToken={token} />;
};

export default NewVerificationPage;
