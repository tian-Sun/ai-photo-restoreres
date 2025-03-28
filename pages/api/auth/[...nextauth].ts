import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      console.log('Session Callback:', { session, user });
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect Callback:', { url, baseUrl });
      
      // 始终使用相对路径
      if (url.startsWith('/')) {
        const finalUrl = `${baseUrl}${url}`;
        console.log('Redirecting to:', finalUrl);
        return finalUrl;
      }
      
      console.log('Redirecting to baseUrl:', baseUrl);
      return `${baseUrl}/restore`;
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback:', {
        user,
        account,
        profile
      });
      return true;
    }
  }
};

export default NextAuth(authOptions);
