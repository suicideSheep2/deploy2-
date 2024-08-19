//  think no need to edit

import { buildConfig, Config } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { Payload } from 'payload';
import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [],
  routes: {
    admin: '/sell',
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- DigitalHippo',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
    components: {
      views: {
        Editor: slateEditor({})
      }
    }
  },
  rateLimit: {
    max: 2000,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
} as unknown as Config);