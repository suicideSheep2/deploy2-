import { z } from "zod"
import { privateProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'
import { getPayloadClient } from '../get-payload'
import { stripe } from "@/lib/stripe"
 

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

          const filteredProducts = products.filter((prod) =>
            Boolean(prod.priceId)
          )

          const order = await payload.create({
            collection: 'orders',
            data: {
              _isPaid: false,
            //   needs to be changed
            // cuz we're imagining user to just 
            // donate whatever amount they want
              products: filteredProducts.map((prod) => prod.id),
              user: user.id,
            },
          })

          const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
        []

        line_items.push({
            // fk can't make stripe id from nepal
            price: "This_is_stripe_made_balance_id_code"
        })
        // transaction fee

          try {
            const stripeSession =
              await stripe.checkout.sessions.create({
                // tf needs to be modified a bit 
                // just a bit of word manipulation tbh
                success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
                //maybe some nepali payments too ?? 
                // sounds too good to be true
                payment_method_types: ['card', 'paypal'], 
                mode: 'payment',
                metadata: {
                  userId: user.id,
                  orderId: order.id,
                },
                line_items,
              })

    }),

})
