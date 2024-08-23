

import { buildConfig, Config } from 'payload/config'
import { Payload } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import path from 'path';
import { Users } from './collections/Users';
import dotenv from "dotenv"
import { Products } from './collections/Products/Products';

dotenv.config({
  path:path.resolve(__dirname, "../.ennv")
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products],
  routes: {
    admin: '/sell',
  },
  admin: {
    user: "users"
,    bundler: webpackBundler(),
    meta:{
        titleSuffix: "- DigitalHippo",
        favicon: '/favicon.ico',
        ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max:2000,
  },

  editor:slateEditor({}),
  db:mongooseAdapter({
    url:process.env.MONGODB_URL!,
  },),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})