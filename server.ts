// changed alll file here to see if it works 

import express from 'express'
import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'

const app = express()
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
  console.log('Starting server...')
  
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  // app.use(payload.authenticate)

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    console.log('Next.js started')

    app.listen(PORT, async () => {
      console.log(`Server is running on http://localhost:${PORT}`)
      console.log(`Admin URL: ${payload.getAdminURL()}`)
    })
  })
}

start().catch((err) => {
  console.error('Error starting server:', err)
})