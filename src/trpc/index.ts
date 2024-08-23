// this is our backend reyyy

import { Router } from "express";
import { publicProcedure, router } from "./trpc";


export const appRouter = router({
   auth: authRouter
   
})

export type AppRouter =typeof appRouter