"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import Button from "../common/Button";
import SocialAuth from "./SocialAuth";
import { FiArrowRight } from "react-icons/fi";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { signUp } from "@/app/actions/auth/register";
import { useState, useTransition } from "react";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (values) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      const result = await signUp(values);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
      }
    })
  };
  return (
    <>
      <Heading title="Register" md center />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
      >
        <FormField<RegisterSchemaType>
          label="Name"
          id="name"
          placeholder="Name"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <FormField<RegisterSchemaType>
          label="Email"
          id="email"
          placeholder="Email"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <FormField<RegisterSchemaType>
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        <FormField<RegisterSchemaType>
          label="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          register={register}
          errors={errors}
          disabled={isPending}
        />
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <Button type="submit" label={isPending ? "Submitting..." : "Register"} icon={FiArrowRight} disabled={isPending} />
        <div className="flex justify-center my-2">Or</div>
        <SocialAuth />
      </form>
    </>
  );
};

export default RegisterForm;
