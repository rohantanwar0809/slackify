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

interface SignInCardProps {
  setSignInFlow: (flow: "signIn" | "signUp") => void;
}

const SignInCard: React.FC<SignInCardProps> = ({ setSignInFlow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className="w-ful h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
      </CardHeader>
      <CardDescription>
        Use your email or another service to continue
      </CardDescription>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <div className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full"
              required
            />
            <Button type="submit" size="lg" className="w-full" disabled={false}>
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
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            variant="secondary"
            size="default"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setSignInFlow("signUp")}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
