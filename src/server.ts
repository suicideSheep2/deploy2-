import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'
import express from 'express'


const app = express()
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
  let payload;
  try {
    payload = await getPayloadClient({
      initOptions: {
        express: app,
        onInit: async (cms) => {
          cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
        },
      },
    })
  } catch (error) {
    console.error('Error initializing payload:', error)
    return // Exit the function if payload initialization fails
  }

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    console.log('Next.js started')

    app.listen(PORT, async () => {
      if (payload && payload.logger) {
        payload.logger.info(
          `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
        )
      } else {
        console.log(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
      }
    })
  }).catch((error) => {
    console.error('Error preparing Next.js:', error)
  })
}

start().catch((err) => {
  console.error('Error starting server:', err)
})