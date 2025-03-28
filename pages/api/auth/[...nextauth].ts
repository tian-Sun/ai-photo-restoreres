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
      console.log('Redirect Callback:', { url, baseUrl, 
        isBaseUrl: url.startsWith(baseUrl),
        isRelative: url.startsWith('/'),
        fullUrl: url
      });

      // 确保 baseUrl 没有尾随斜杠
      baseUrl = baseUrl.replace(/\/$/, '');
      
      // 如果是完整的 URL
      if (url.startsWith('http')) {
        // 确保域名匹配
        const urlDomain = new URL(url).origin;
        const baseDomain = new URL(baseUrl).origin;
        if (urlDomain === baseDomain) {
          console.log('Allowing full URL redirect:', url);
          return url;
        }
        console.log('Domain mismatch, falling back to baseUrl');
        return baseUrl;
      }

      // 如果是相对路径
      if (url.startsWith('/')) {
        const finalUrl = `${baseUrl}${url}`;
        console.log('Redirecting to relative URL:', finalUrl);
        return finalUrl;
      }

      console.log('Fallback to baseUrl:', baseUrl);
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback:', {
        user,
        accountType: account?.type,
        accountProvider: account?.provider,
        profile
      });
      return true;
    }
  },
  events: {
    async signIn(message) { 
      console.log('SignIn Event:', message);
    },
    async signOut(message) { 
      console.log('SignOut Event:', message);
    }
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
