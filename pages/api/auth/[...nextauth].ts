import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
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
    // 在JWT创建或更新时调用
    async jwt({ token, user }) {
      // 首次登录时，user对象是可用的。
      // 我们从数据库的 user 对象中把所有需要的信息都存到 token 里。
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
        token.credits = user.credits;
      }
      return token;
    },

    // 在每次访问 session 时调用
    async session({ session, token }) {
      // 我们从 token 中取出所有自定义字段，附加到 session.user 对象上。
      if (session.user) {
        session.user.id = token.id;
        session.user.plan = token.plan;
        session.user.credits = token.credits;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  }
};

export default NextAuth(authOptions);
