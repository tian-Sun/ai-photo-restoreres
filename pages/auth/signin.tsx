import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const { error } = router.query;

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/restore' });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Head>
        <title>登录 - AI Photo Restorer</title>
      </Head>
      {error && (
        <div className="fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <div className="font-bold">登录错误</div>
          <div className="mt-2">
            登录验证失败，请确保已在 Google 中授权访问。
          </div>
        </div>
      )}
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
          onClick={handleSignIn}
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