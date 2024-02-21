import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';

import type { User } from '@prisma/client';

import { PrismaAdapter } from '@auth/prisma-adapter';

import bcrypt from 'bcryptjs';

import { db } from '@/db/connect/prisma';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing Github OAuth credentials');
}

const authOptions: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credentials not valid.');
        }

        if (!authOptions || !authOptions.adapter || !authOptions.adapter.getUserByEmail) {
          throw new Error('Credentials not valid.');
        }

        try {
          const user = await db.user.findFirst({ where: {
            email: credentials.email,
          }});

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password as string,
              user.password as string,
            );

            if (isPasswordCorrect) {
              return {
                ...user,
                email: user.email
              };
            }
          }

          return null;
        } catch (error: unknown) {          
          let errorMsg = 'Something totally unespected happened while cheking user authorization.';
          if (error instanceof Error) {
            errorMsg = error.message;
          }
          throw new Error(errorMsg);
        }        
      },
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // usually not needed. fixing a current nextauth bug
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },    
  },
};

export const {
  handlers: {
    GET,
    POST,
  },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
