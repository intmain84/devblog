"use client";

import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";

const CreateBlogForm = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({ resolver: zodResolver(BlogSchema) });

  return (
    <form className="flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh]">
      <FormField<BlogSchemaType>
        id="title"
        placeholder="Blog title"
        register={register}
        errors={errors}
        disabled={false}
        inputClassNames="border-none text-5xl font-bold focus:ring-0 bg-transparent px-0"
      />
      <FormField<BlogSchemaType>
        label="Content"
        id="content"
        placeholder="Blog content"
        register={register}
        errors={errors}
        disabled={false}
      />
    </form>
  );
};

export default CreateBlogForm;
