import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";


export  const authOptions = {
     adapter: PrismaAdapter(db),
     session:{
        strategy:'jwt'
     },
    pages: {
        signIn: 'Login'
    },

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
               if(!credentials?.email || !credentials?.password){
                  return null
               } 

               const existingUser = await db.user.findUnique({
                where:{email: credentials?.email}
               })
               if(!existingUser){
                return null
               }

               const paswordMatch = await compare(credentials.password,existingUser.password)
               if(!paswordMatch){
                return null
               }


               return{
                id: existingUser.id,
                email:existingUser.email,
                name:existingUser.name
               }

            }
        })
    ]

}