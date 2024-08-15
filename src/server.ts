// this is for admin dashboard
import express from 'express'
import { getPayloadClient } from './app/get-payload'


const app = express()
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info('Admin URL ${cms.getAdminURL()}')
            },
        },
    })

}

start()

