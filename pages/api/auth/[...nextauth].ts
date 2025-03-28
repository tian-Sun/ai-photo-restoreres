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
          prompt: "select_account",
          access_type: "online"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect Callback:', { url, baseUrl });
      
      // 如果是相对路径，添加基础 URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // 如果 URL 包含基础域名，直接返回
      if (url.startsWith(baseUrl)) {
        return url;
      }
      
      // 默认重定向到 restore 页面
      return `${baseUrl}/restore`;
    },
    async signIn({ user, account, profile }) {
      try {
        console.log('SignIn Callback:', {
          userId: user.id,
          email: user.email,
          provider: account?.provider
        });
        
        if (!user.email) {
          console.error('No email provided');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('SignIn Error:', error);
        return false;
      }
    }
  }
};

export default NextAuth(authOptions);
