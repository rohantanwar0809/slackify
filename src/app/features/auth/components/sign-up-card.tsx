"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setSignInFlow: (flow: "signIn" | "signUp") => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ setSignInFlow }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useAuthActions();

  const passwordSignUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", { name: fullName, email, password, flow: "signUp" })
      .catch((err) => {
        setError("Invalid credentials");
        setPending(false);
      })
      .finally(() => setPending(false));
  };

  const providerSignInHandler = (provider: "github" | "google") => {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  };
  return (
    <Card className="w-ful h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardDescription>
        Use your email or another service to continue
      </CardDescription>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={passwordSignUpHandler}>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              className="w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={pending}
            />
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={pending}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={pending}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              className="w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={pending}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={pending}
            >
              Continue
            </Button>
          </div>
        </form>
        <Separator />
        {/* oauth buttons */}
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="secondary"
            size="default"
            className="w-full relative"
            disabled={pending}
            onClick={() => providerSignInHandler("google")}
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="w-full relative"
            disabled={pending}
            onClick={() => providerSignInHandler("github")}
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setSignInFlow("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
