import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="container flex h-dvh flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="flex items-center gap-4 text-6xl font-semibold text-foreground drop-shadow-md">
          Welcome to Littlerock College app
        </h1>
        {!user ? (
          <div>
            <LoginButton asChild>
              <Button variant={"secondary"} size={"lg"}>
                Sign in
              </Button>
            </LoginButton>
          </div>
        ) : (
          <p>
            Proceed to the
            <Button variant={"link"} asChild>
              <Link href={"/dashboard"}>dashboard</Link>
            </Button>
          </p>
        )}
      </div>
    </div>
  );
}
