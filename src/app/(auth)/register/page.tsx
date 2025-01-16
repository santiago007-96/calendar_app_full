'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { addUser } from "../../hooks/useUser";
import Link from 'next/link';


const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        const res = await addUser(data);

        if (res?.ok) {
            router.push('/login');
        }

    })


    return (
        <div className='h-[calc(100vh)] flex justify-center items-center'>
            <form onSubmit={onSubmit} className='w-1/4 bg-white px-4 rounded'>
                <div className='text-slate-200 font-bold text-4xl mb-4 p-3'>

                    <h1 className='text-black '>New Account</h1>
                </div>

                <label htmlFor='name'
                    className='text-black mb-2 block text-sm'
                >Name</label>
                <input type='text'
                    {
                    ...register("name", {
                        required: {
                            value: true,
                            message: "Name is required"
                        }
                    })
                    }
                    className='p-3 rounded block mb-2 text-stone-950 w-full'
                    placeholder='Alex'
                />
                {
                    errors.name && (
                        <span className='text-red-500 text-sm'>
                            {errors.name.message?.toString()}
                        </span>
                    )
                }
                <label htmlFor='lastName'
                    className='text-black mb-2 block text-sm'
                >Last Name</label>
                <input type='text'
                    {
                    ...register("lastName", {
                        required: {
                            value: true,
                            message: "Last Name is required"
                        }
                    })
                    }
                    className='p-3 rounded block mb-2 text-stone-950 w-full'
                    placeholder='Gonzalez'
                />
                {
                    errors.lastName && (
                        <span className='text-red-500 text-sm'>
                            {errors.lastName.message?.toString()}
                        </span>
                    )
                }



                <label htmlFor='email'
                    className='text-black mb-2 block text-sm'
                >Email</label>
                <input type='email'
                    {
                    ...register("email", {
                        required: {
                            value: true,
                            message: "Email is required"
                        }
                    })
                    }
                    className='p-3 rounded block mb-2 text-stone-950 w-full'
                    placeholder='alexg12@gmail.com'
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
                    placeholder='********'
                />
                {
                    errors.password && (
                        <span className='text-red-500 text-sm'>
                            {errors.password.message?.toString()}
                        </span>
                    )
                }
                <label htmlFor='confirmPassword'
                    className='text-black mb-2 block text-sm'
                >Confirm Password</label>
                <input type='password'
                    {
                    ...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Confirm Password is required"
                        }
                    })
                    }
                    className='p-3 rounded block mb-2 text-stone-950 w-full'
                    placeholder='********'
                />
                {
                    errors.confirmPassword && (
                        <span className='text-red-500 text-sm'>
                            {errors.confirmPassword.message?.toString()}
                        </span>
                    )
                }

                <button
                    className='w-full bg-slate-900 text-white p-3 rounded-lg mb-2'
                >
                    Register
                </button>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 ">
                    <Link href='/login'
                        className='text-blue-700 hover:underline dark:text-blue-500 '>
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage