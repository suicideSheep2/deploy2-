import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'
import { Users } from './collections/Users'
import dotenv from "dotenv"
import { Products } from './collections/Products/Products'
import { Media } from './collections/Media'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Configuration } from 'webpack'

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

console.log('Starting Payload CMS...')
console.log('Environment variables:')
console.log('- MONGODB_URL:', process.env.MONGODB_URL ? 'Set' : 'Not set')
console.log('- PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'Set' : 'Not set')
console.log('- NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL)

const mongooseOptions = {
  connect: {
    timeout: 60000,
    retry: true,
    retryDelay: 1000,
  },
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media],
  routes: {
    admin: '/publish',
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    webpack: (config: Configuration) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'react': path.join(__dirname, '../node_modules/react'),
          'react-dom': path.join(__dirname, '../node_modules/react-dom'),
        },
      },
    }),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => defaultFeatures,
  }),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
    ...mongooseOptions,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  debug: process.env.NODE_ENV === 'development',
})