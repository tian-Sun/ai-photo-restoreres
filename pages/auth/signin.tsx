import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Head from 'next/head';

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Head>
        <title>登录 - AI Photo Restorer</title>
      </Head>
      <div className="flex flex-col items-center space-y-6">
        <Image
          src="/imageIcon.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold">登录到 AI Photo Restorer</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex items-center space-x-2 rounded-lg border border-gray-200 px-10 py-2 transition-colors hover:bg-gray-50"
        >
          <Image
            src="/google.png"
            alt="Google"
            width={20}
            height={20}
          />
          <span>使用 Google 账号登录</span>
        </button>
      </div>
    </div>
  );
} 