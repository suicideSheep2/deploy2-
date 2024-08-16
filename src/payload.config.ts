import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [], // Add your collections here
  routes: {
    admin: '/sell',
  },
  admin: {
    user: 'users', // or whatever your users collection is called
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Your App Name',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})