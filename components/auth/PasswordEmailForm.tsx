"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { FiArrowRight } from "react-icons/fi";
import Heading from "../common/Heading";
import { useState, useTransition } from "react";
import Alert from "../common/Alert";
import { PasswordSchema, PasswordSchemaType } from "@/schemas/PasswordSchema";
import { resetPasswordEmail } from "@/app/actions/auth/reset-password-email";

const PasswordResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordSchemaType>({ resolver: zodResolver(PasswordSchema) });

    const onSubmit: SubmitHandler<PasswordSchemaType> = (data) => {
        setError(undefined);
        startTransition(async () => {
            const result = await resetPasswordEmail(data);
            if (result?.error) {
                setError(result.error);
                return
            }
            if (result?.success) {
                setSuccess(result.success);
                return
            }
        })
    };

    return (
        <>
            <Heading title="Forgot Your Password?" md center />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
            >
                <FormField<PasswordSchemaType>
                    label="Email"
                    id="email"
                    placeholder="Email"
                    register={register}
                    errors={errors}
                    disabled={isPending}
                />
                {error && <Alert error message={error} />}
                {success && <Alert success message={success} />}
                <Button type="submit" label={isPending ? "Submitting..." : "Send Reset Email"} icon={FiArrowRight} disabled={isPending} />
            </form>
        </>
    );
};

export default PasswordResetForm;
