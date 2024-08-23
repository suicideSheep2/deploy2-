// this is our backend reyyy

import { Router } from "express";
import { publicProcedure, router } from "./trpc";


export const appRouter = router({
    anyApiRoute:publicProcedure.query(() =>{
        return 'hello'
    } ),
})

export type AppRouter =typeof appRouter