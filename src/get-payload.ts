// get-payload.ts this file supposedly had worked dont't touch uffs

import dotenv from 'dotenv'
import path from 'path'
import type { InitOptions } from 'payload/config'
import payload from 'payload'

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

let cached = (global as any).payload

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    }
}

interface Args {
    initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({
    initOptions,
}: Args = {}) => {
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET is missing')
    }
    if (cached.client) {
        return cached.client
    }

    if (!cached.promise) {
        const mongoURL = process.env.MONGODB_URL || false;
        console.log('Initializing Payload with the following settings:')
        console.log(`PAYLOAD_SECRET: ${process.env.PAYLOAD_SECRET}`)
        console.log(`MONGODB_URL: ${mongoURL}`)

        try {
            cached.promise = payload.init({
                secret: process.env.PAYLOAD_SECRET,
                local: initOptions?.express ? false : true,
                mongoURL: mongoURL, 
                ...(initOptions || {}),
            })
        } catch (error) {
            console.error('Error during Payload initialization:', error)
        }
    }

    try {
        cached.client = await cached.promise
        console.log('Payload initialized successfully')
    } catch (e: unknown) {
        cached.promise = null
        console.error('Error finalizing Payload client:', e)
        throw e
    }

    return cached.client
}
