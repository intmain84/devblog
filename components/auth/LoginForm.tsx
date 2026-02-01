"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { FiArrowRight } from "react-icons/fi";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log("data>>>>:", data);
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
        />
        <FormField<LoginSchemaType>
          label="Password"
          id="password"
          placeholder="Password"
          register={register}
          errors={errors}
        />
        <Button type="submit" label="Login" icon={FiArrowRight} />
        <div className="flex justify-center my-2">Or</div>
        <SocialAuth />
      </form>
    </>
  );
};

export default LoginForm;
