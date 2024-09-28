import {z} from 'zod'


export const registerSchema = z.object({
    username: z.string().min(4),
    email : z.string().email(),
    password: z.string()
})

export type RegisterSchema = z.infer<typeof registerSchema>
