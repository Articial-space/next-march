'use client'

import { registerUser } from '@/app/action/authAction'
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { GiPadlock } from 'react-icons/gi'

export default function RegisterForm() {
    const {register, handleSubmit, setError, formState:{errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data : RegisterSchema) => {
        const result = await registerUser(data)
        if (result.status === 'success') {
            console.log('User registered')
        } else {
            if (Array.isArray(result.error)) {
                result.error.forEach((e: any) => {
                    const fieldname = e.path.join('.') as 'email' | 'username' | 'password'
                    setError(fieldname, {message: e.message})
                });
            } else {
                setError('root.serverError', {message: result.error})
            }
        }
    }

    return (
    <Card className='w-2/5 mx-auto min-w-16'>
        <CardHeader className='flex flex-col items-center justify-center'>
            <div className='flex flex-col w-full items-center justify-center'>
                <div className='flex w-full items-center justify-center space-x-2 text-blue-600'>
                    <GiPadlock size={30}/>
                    <h1 className='text-3xl font-semibold'>Register</h1>
                </div>
                <p className='text-neutral-500'>Welcome to DemoJS</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                <Input
                    defaultValue=''
                    label='Username'
                    variant='bordered'
                    {...register('username')}
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                    />
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
                    {errors.root?.serverError && (
                        <p className='text-danger-500 text-sm'>{errors.root?.serverError.message}</p>
                    )}
                    <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='primary' type='submit'>
                        Register
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
  )
}
