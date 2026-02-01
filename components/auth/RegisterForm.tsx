"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import Button from "../common/Button";
import SocialAuth from "./SocialAuth";
import { FiArrowRight } from "react-icons/fi";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    console.log("data>>>>:", data);
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
        />
        <FormField<RegisterSchemaType>
          label="Email"
          id="email"
          placeholder="Email"
          register={register}
          errors={errors}
        />
        <FormField<RegisterSchemaType>
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
        />
        <FormField<RegisterSchemaType>
          label="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          register={register}
          errors={errors}
        />
        <Button type="submit" label="Register" icon={FiArrowRight} />
        <div className="flex justify-center my-2">Or</div>
        <SocialAuth />
      </form>
    </>
  );
};

export default RegisterForm;
