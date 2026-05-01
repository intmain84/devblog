"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { FiArrowRight } from "react-icons/fi";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { useState, useTransition } from "react";
import Alert from "../common/Alert";
import { logIn } from "@/app/actions/auth/login";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError(undefined);
    startTransition(async () => {
      const result = await logIn(data);
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (result?.success) {
        setSuccess(result.success);
        return;
      }
    });
  };

  return (
    <>
      <Heading title="Login" md center />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
      >
        <FormField<LoginSchemaType>
          label="Email"
          id="email"
          placeholder="Email"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <FormField<LoginSchemaType>
          label="Password"
          id="password"
          placeholder="Password"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <Link href="/password-email-form">Forgot password?</Link>
        {error && <Alert error message={error} />}
        {success && <Alert success message={success} />}
        <Button
          type="submit"
          label={isPending ? "Submitting..." : "Login"}
          icon={FiArrowRight}
          disabled={isPending}
        />
        <div className="flex justify-center my-2">Or</div>
        <SocialAuth />
      </form>
    </>
  );
};

export default LoginForm;
