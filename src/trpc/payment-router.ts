import { z } from "zod"
import { privateProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'
import { getPayloadClient } from '../get-payload'
 

export const paymentRouter = router({
    createSession: privateProcedure
    .input(z.object ({ productIds: z.array(z.string())}))
    .mutation(async({ctx, input }) => {
        const {user} = ctx
        let {productIds } = input

// this cheeeks if the cart is empty doesn't allows us to pay
// need t oremove this restriction so user can pay freely ?? 
// huh sth along the line ....for later yll ffff
        if(productIds.length == 0){
            throw new TRPCError({code: 'BAD_REQUEST'})
        }

        const payload = await getPayloadClient()
        
        // tbh this is also useless cuz
        // we are dreaming of a place where 
        // donater can freely donate fkkk
        // atleast thats the vision
        const { docs: products } = await payload.find({
            collection: 'products',
            where: {
              id: {
                in: productIds,
              },
            },
          })

    }),

})
