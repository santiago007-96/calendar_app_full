'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = handleSubmit(async data => {
        console.log(data);
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });



        if (res?.error) {
            setError(res.error);
        } else {
            router.push('/dashboard');
        }


    })

    return (
        <div className='h-[calc(100vh)] flex justify-center items-center'>
            <form onSubmit={onSubmit} className='w-1/4 bg-white px-4 rounded'>
                <div className='text-slate-200 font-bold text-4xl mb-4 p-3'>

                    <h1 className='text-black '>Sign in</h1>
                </div>
                {
                    error && (
                        <p className='bg-red-500 text-lg text-white p-3 rounded mb-2'>{error}</p>
                    )
                }
                <label htmlFor='email'
                    className='text-black mb-2 block text-sm'
                >Email</label>
                <input type='text'
                    {
                    ...register("email", {
                        required: {
                            value: true,
                            message: "Email is required"
                        }
                    })
                    }
                    className='p-3 rounded block mb-2 text-stone-950 w-full'
                    placeholder='james@gmail.com'
                />
                {
                    errors.email && (
                        <span className='text-red-500 text-sm'>
                            {errors.email.message?.toString()}
                        </span>
                    )
                }

                <label htmlFor='password'
                    className='text-black mb-2 block text-sm'
                >Password</label>
                <input type='password'
                    {
                    ...register("password", {
                        required: {
                            value: true,
                            message: "Password is required"
                        }
                    })
                    }
                    className='p-3 rounded block mb-2 text-stone-950 w-full'
                    placeholder='*********'
                />
                {
                    errors.password && (
                        <span className='text-red-500 text-sm'>
                            {errors.password.message?.toString()}
                        </span>
                    )
                }

                <button
                    className='w-full bg-slate-900 text-white p-3 rounded-lg mb-2'
                >
                    Login
                </button>
                <div className="text-sm font-medium text-black">
                    Do not have an account yet?
                    <Link
                        href={"/register"}
                        className='text-blue-700 hover:underline dark:text-blue-500'>
                        Create account
                    </Link>

                </div>
            </form>
        </div>
    )
}

export default LoginPage