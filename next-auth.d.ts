// next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

// 扩展 JWT 类型，添加我们自定义的字段
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    plan?: string | null;
    credits?: number | null;
  }
}

// 扩展 Session 类型，添加我们自定义的字段
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      plan?: string | null;
      credits?: number | null;
    } & DefaultSession['user'];
  }
  
  // 如果你需要直接在 user 对象上用，也可以扩展 User 类型
  interface User extends DefaultUser {
    id: string;
    plan?: string | null;
    credits?: number | null;
  }
}