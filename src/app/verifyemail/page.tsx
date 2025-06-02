"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (error) {
            setError(true);
            console.error("Error verifying email:", error);
        }
    };

    useEffect(() => {
        setError(false);
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, [searchParams]);

    useEffect(() => {
        setError(false);
    if (token.length > 0 && !verified && !error) {
        verifyUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

    return (
        <section >
            <div className='flex items-center flex-col justify-center h-200' >

                <h1 className="font-bold text-4xl" >Verify Email</h1>
                <h2 className="my-10" >{token? `${token}` : "no token"}</h2>
                <h2 className="text-2xl text-green-700" >{verified && (
                    <div>
                        <h2>Verified</h2>
                        <Link className='mt-5 underline text-blue-800 font-bold' href="/login" >Login Page</Link>
                    </div>
                )}</h2>
                <h2 className="text-2xl text-red-700" >{error && (
                    <div>
                        <h2>Error</h2>
                    </div>
                )}</h2>

            </div>
        </section>
    );
}