// changed alll file here to see if it works 

import { getPayloadClient } from '@/get-payload'
import { nextApp, nextHandler } from '@/next-utils'
import express from 'express'


const app = express()
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
  
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })


  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    console.log('Next.js started')

    app.listen(PORT, async () => {
      payload.logger.info(
       `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}` 
      )
    })
  })
}

start()
// .catch((err) => {
//   console.error('Error starting server:', err)
// })