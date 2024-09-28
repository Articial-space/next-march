'use server'

import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchemas";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchemas";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { signOut } from "@/auth"


export async function signInUser(data: LoginSchema) : Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        return {status: 'success', data: 'Logged in'}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {status: 'error', error: 'Invalid sign in'}
                default:
                    return {status: 'error', error: 'Something went wrong'}
            }
        } else {
            return {status: 'error', error: 'Undefined errors'}
        }
    }
}


export async function signUserOut() {
    await signOut({redirectTo: '/'})
  }

export async function registerUser(data : RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data)
        console.log(validated)
        if (!validated.success) {
            return {status: 'error', error : validated.error.errors}
        }
    
        const {username, email, password} = validated.data
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await prisma.user.findUnique({
            where : {email: email}
        })
    
        if (existingUser) {
            return {status: 'error', error: 'Email is already existed!'}
        }
    
        const user = await prisma.user.create({
                        data: {
                            name: username,
                            email,
                            passwordHash: hashedPassword
                        }
                    })
        return {success: 'true', data: user}
    } catch (e) {
        console.log(e)
        return {status: 'error', error: 'Something went wrong'}
    }
}

export async function getUserByEmail(email : string) {
    return prisma.user.findUnique({where : {email}})
}

export async function getUserById(id : string) {
    return prisma.user.findUnique({where : {id}})
}