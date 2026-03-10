"use client";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/Button";
import { signIn } from "next-auth/react";

const SocialAuth = () => {
  const handleLogin = (provider: 'github' | 'google') => {
    signIn(provider);
  }

  return (
    <div>
      <Button
        label="Continue with GitHub"
        type="button"
        icon={FaGithub}
        className="w-full text-white"
        outlined
        onClick={() => handleLogin("github")}
      />
      <Button
        label="Continue with Google"
        type="button"
        icon={FaGoogle}
        className="w-full text-white"
        outlined
        onClick={() => handleLogin("google")}
      />
    </div>
  );
};

export default SocialAuth;
