import { PrimaryActionEmailHtml } from "@/components/emails/PrimaryActionEmail";
import { Label } from "@radix-ui/react-label";
import { Access, CollectionConfig } from "payload/types";

const adminsAndUser: Access = ({req: {user}}) => {
 if (user.role === 'admin') return true

 return {
    id: {
        equals: user.id,
    },
 }
}

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
      verify: {
        generateEmailHTML: ({ token }) => {
          return PrimaryActionEmailHtml({
            actionLabel: "verify your account",
            buttonText: "Verify Account",
            href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
          })
        },
      },
    },
    access:{
        read: adminsAndUser,
        create: () => true,
        update: ({req}) => req.user.role === 'admin',
        delete: ({req}) => req.user.role === 'admin'
    },
    admin: {
        hidden: ({user}) => user.role !== 'admin',
        defaultColumns: ['id'],
    },

    fields: [
        // for security 
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false
            },
            type: 'relationship',
            relationTo:'products',
            hasMany: true, //allows single user to have multiple products
        },
        // for security 
        {
            name: 'product_files',
            label: 'product files',
            admin: {
                condition: () => false
            },
            type: "relationship",
            relationTo:'products_files',
            hasMany: true, //allows single user to have multiple products
        },
        {
            name: 'role',
            defaultValue: 'user',
            required: true,
            admin: {
                // condition: () => false,
            },
            type: "select",
            options: [
                {label: 'Admin', value: 'admin'},
                {label: 'User', value: 'user'},
            ],
        },
    ],
}