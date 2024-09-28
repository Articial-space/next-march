import { ZodIssue } from "zod";

type ActionResult<T> = {success: 'true', data: T} | {status: 'error', error: string | ZodIssue[]}