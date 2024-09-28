'use client'

import { signInUser } from '@/app/action/authAction'
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { GiPadlock } from 'react-icons/gi'
import { toast } from 'react-toastify'

export default function LoginForm() {
    const router = useRouter()
    const {register, handleSubmit, formState:{errors, isValid, isSubmitting}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data : LoginSchema) => {
        const result = await signInUser(data)
        if (result.status === 'success') {
            router.push('/members')
            router.refresh()
        } else {
            toast.error(result.error as string)
        }
    }

    return (
    <Card className='w-2/5 mx-auto min-w-16'>
        <CardHeader className='flex flex-col items-center justify-center'>
            <div className='flex flex-col w-full items-center justify-center'>
                <div className='flex w-full items-center justify-center space-x-2 text-blue-600'>
                    <GiPadlock size={30}/>
                    <h1 className='text-3xl font-semibold'>Login</h1>
                </div>
                <p className='text-neutral-500'>Welcome back to DemoJS</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <Input
                    defaultValue=''
                    label='Email'
                    variant='bordered'
                    {...register('email')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    />
                    <Input
                    defaultValue=''
                    label='Password'
                    variant='bordered'
                    type='Password'
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    />
                    <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='primary' type='submit'>
                        Log in
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
  )
}
