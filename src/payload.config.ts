import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'
import { Users } from './collections/Users'
import dotenv from "dotenv"
import { Products } from './collections/Products/Products'
import { Media } from './collections/Media'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Fix the dotenv path and add error handling
dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

// Add some logging to help with debugging
console.log('Starting Payload CMS...')
console.log('Environment variables:')
console.log('- MONGODB_URL:', process.env.MONGODB_URL ? 'Set' : 'Not set')
console.log('- PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set' : 'Not set')
console.log('- NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL)

// Create MongoDB adapter with error handling
const mongooseOptions = {
  connect: {
    timeout: 60000,
    retry: true,
    retryDelay: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media],

  // added for trying
  cors: [
    'https://uperhaps.up.railway.app', // Your Railway app URL
  ],
  
  csrf: [
    'https://uperhaps.up.railway.app', // Your Railway app URL
  ],



  routes: {
    admin: '/publish',
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
    ...mongooseOptions,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  // Add global error handler
  onInit: async (payload) => {
    payload.logger.info(`Payload initialized`)
  },
})