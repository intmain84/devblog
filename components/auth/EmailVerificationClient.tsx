'use client'

import verifyEmailAction from "@/app/actions/auth/email-verification";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import Alert from "../common/Alert";
import Button from "../common/Button";

const EmailVerificationClient = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [pedning, setPending] = useState<boolean | undefined>(undefined)
    const router = useRouter()

    useEffect(() => {
        if (!token) return;
        setError(undefined);
        setPending(true);
        const verifyEmail = async () => {
            try {
                const result = await verifyEmailAction(token)

                if (result?.error) {
                    setError(result.error)
                    setSuccess(undefined)
                } else {
                    setError(undefined)
                    setSuccess(result?.success)
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error")
            } finally {
                setPending(false)
            }
        }

        verifyEmail()

    }, [])

    return <div>
        <Heading title="WEBDEV.blog" center />
        {pedning && <div>Veryfying email...</div>}
        {error && <Alert error message={error} />}
        {success && <Alert success message={success} />}
        {success && <Button type="submit" label="Login" onClick={() => router.push('/login')} />}
    </div>
}

export default EmailVerificationClient;