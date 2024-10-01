import { buildConfig, Config } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import path from 'path';
import { Users } from './collections/Users';
import dotenv from "dotenv"
import { Products } from './collections/Products/Products';
import { Media } from './collections/Media';


import { lexicalEditor } from '@payloadcms/richtext-lexical'; // Add this import


dotenv.config({
  path:path.resolve(__dirname, "../.env")
})

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media,],
  routes: {
    // mauybe change here to /publish
    admin: '/publish',
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

  // here we are changing the editor to lexical
  editor:lexicalEditor({}),
  db:mongooseAdapter({
    url:process.env.MONGODB_URL!,
  },),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})