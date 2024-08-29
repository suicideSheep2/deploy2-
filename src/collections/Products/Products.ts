import { Access, CollectionConfig } from 'payload/types'
import { PRODUCT_CATEGORIES } from '../../config'
import { Product, User } from '../../payload-types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'

// mostly to add remove update products we also need stripe
// side by side and need to keep track of
// we haven't done it and left it 
// video time around 9:46:18 josh


// fkk cuz access is fucked here brr
// need to write it oneself without stripe maybe ?? 
// ahhh 

const addUser: BeforeChangeHook<Product> = async ({req, data}) => {
  const user = req.user

  return {...data, user:user.id}
}
// added time 11:29.. 


// till here
export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
      useAsTitle: 'name',
    },
    access: {},
    hooks: {
      beforeChange: [addUser, async (args) => {
        
        // here we need some kind of stripe implementation 
        // functionality to go with creation of price = no need for me
        // updates deletes and so on 
      }],
    },
    fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          hasMany: false,
          admin: {
            condition: () => false,
          }
        },
        {
            name: 'name',
            label:'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Product details',
          },
          {
            name: 'price',
            label: 'Price in USD',
            min: 0,
            max: 1000,
            type: 'number',
            required: true,
          },
          {
            name: 'category',
            label: 'Category',
            type: 'select',
           options: PRODUCT_CATEGORIES.map(
              ({ label, value }) => ({ label, value })
            ),
            required: true,
          },
          {
            name: 'product_files',
            label: 'Product file(s)',
            type: 'relationship',
            required: true,
            relationTo: 'product_files',
            hasMany: false,
          },
          {
            name: 'approvedForSale',
            label: 'Product Status',
            type:  "select",
            defaultValue: 'pending',
            access: {
              create: ({ req }) => req.user.role === 'admin',
              read: ({ req }) => req.user.role === 'admin',
              update: ({ req }) => req.user.role === 'admin',
            },
            options: [
              {
                label: 'Pending verification',
                value: 'pending',
              },
              {
                label: 'Approved',
                value: 'approved',
              },
              {
                label: 'Denied',
                value: 'denied',
              },
            ],
          },
          {
            name: 'priceId',
            access: {
              create: () => false,
              read: () => false,
              update: () => false,
            },
            type: 'text',
            admin: {
              hidden: true,
            },
          },
          {
            name: 'stripeId',
            access: {
              create: () => false,
              read: () => false,
              update: () => false,
            },
            type: 'text',
            admin: {
              hidden: true,
            },
          },
          {
            name: 'images',
            type: 'array',
            label: 'Product images',
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
              singular: 'Image',
              plural: 'Images',
            },
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
              },
            ],
          },
        ],
      }