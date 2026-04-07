"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { FiArrowRight } from "react-icons/fi";
import Heading from "../common/Heading";
import { useState, useTransition } from "react";
import Alert from "../common/Alert";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas/ResetPasswordSchema";
import { resetPassword } from "@/app/actions/auth/reset-password";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordSchemaType>({ resolver: zodResolver(ResetPasswordSchema) });

    const onSubmit: SubmitHandler<ResetPasswordSchemaType> = (data) => {
        setError(undefined);
        startTransition(async () => {
            const result = await resetPassword(data, token);
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
            <Heading title="Reset Password" md center />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col max-w-[500px] m-auto mt-8 gap-4"
            >
                <FormField<ResetPasswordSchemaType>
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    errors={errors}
                    disabled={isPending}
                />
                <FormField<ResetPasswordSchemaType>
                    label="Confirm password"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    register={register}
                    errors={errors}
                    disabled={isPending}
                />
                {error && <Alert error message={error} />}
                {success && <Alert success message={success} />}
                <Button type="submit" label={isPending ? "Submitting..." : "Create New Password"} icon={FiArrowRight} disabled={isPending} />
            </form>
        </>
    );
}

export default ResetPasswordForm;