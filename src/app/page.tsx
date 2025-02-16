// src/app/page.tsx
'use client';

import React, {useContext, useEffect} from 'react';
import Link from 'next/link';

export default function Home() {


    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <Link href="/login">
                        <span>Log in</span>
                    </Link>
                    <Link href="/signup">
                        <span>Sign Up</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}