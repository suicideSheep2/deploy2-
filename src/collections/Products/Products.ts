import { Access, CollectionConfig } from 'payload/types';
import { PRODUCT_CATEGORIES } from '../../config';
import { Product, User } from '../../payload-types';
import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { lexicalEditor, HTMLConverterFeature, lexicalHTML } from '@payloadcms/richtext-lexical';

// Hook to add the user to the product before saving
const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;
  return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    // Restrict read access
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true; // Admins can see all products
      }
      // Regular users can only see their own products
      return {
        user: {
          equals: user?.id,
        },
      };
    },
    // Restrict create access
    create: ({ req: { user } }) => {
      return Boolean(user); // All logged-in users can create products
    },
    // Restrict update access
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true; // Admins can update any product
      }
      // Regular users can only update their own products
      return {
        user: {
          equals: user?.id,
        },
      };
    },
    // Restrict delete access
    delete: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true; // Admins can delete any product
      }
      // Regular users can only delete their own products
      return {
        user: {
          equals: user?.id,
        },
      };
    },
  },
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        // Add other hooks here if needed, e.g., Stripe integration
      },
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false, // Hide the field in the admin panel
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Your Content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: 'approvedForSale',
      label: 'Product Status',
      type: 'select',
      defaultValue: 'pending',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        // changing to let know general users of their contnet status
        read:() => true,
        // read: ({ req }) => req.user.role === 'admin',
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
      // noo this wont even show status for general users 
      // admin: {
      //   condition: ({ user }) => user.role === 'admin', // Only allow editing for admins
      // },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Content images',
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
};
