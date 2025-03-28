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
  debug: true, // 启用调试模式
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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
      // 允许内部URL的重定向
      if (url.startsWith(baseUrl)) {
        console.log('Redirecting to internal URL:', url);
        return url;
      }
      // 允许相对URL的重定向
      if (url.startsWith('/')) {
        const finalUrl = `${baseUrl}${url}`;
        console.log('Redirecting to relative URL:', finalUrl);
        return finalUrl;
      }
      console.log('Fallback to baseUrl:', baseUrl);
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SignIn Callback:', { 
        user, 
        account, 
        profile,
        email: email ? 'exists' : 'none',
        credentials: credentials ? 'exists' : 'none'
      });
      return true;
    },
  },
  events: {
    async signIn(message) { console.log('SignIn Event:', message) },
    async signOut(message) { console.log('SignOut Event:', message) }
  },
  logger: {
    error(code, ...message) {
      console.error('NextAuth Error:', { code, message });
    },
    warn(code, ...message) {
      console.warn('NextAuth Warning:', { code, message });
    },
    debug(code, ...message) {
      console.log('NextAuth Debug:', { code, message });
    }
  }
};

export default NextAuth(authOptions);
