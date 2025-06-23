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
    // 这个函数会在JWT（JSON Web Token）被创建或更新时调用
    async jwt({ token, user }) {
      // 在用户首次登录时，`user` 对象是可用的。
      // 我们将 user.id 添加到 token 中，它会被加密并保存在 cookie 里。
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // 这个函数在每次访问 session 时（比如调用 useSession）都会被调用
    async session({ session, token }) {
      // 我们从服务端的 token 中获取 id，然后把它附加到客户端可见的 session 对象上。
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  }
};

export default NextAuth(authOptions);
