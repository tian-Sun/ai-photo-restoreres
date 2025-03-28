import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SignIn() {
  const router = useRouter();
  const { error, callbackUrl } = router.query;

  useEffect(() => {
    if (error) {
      console.error('Auth Error:', {
        error,
        query: router.query,
        asPath: router.asPath
      });
    }
  }, [error, router]);

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/restore',
        redirect: false
      });

      if (result?.error) {
        console.error('SignIn Error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('SignIn Error:', error);
    }
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
            {error === 'Callback' 
              ? '登录验证失败，请确保已在 Google 中授权访问。' 
              : '登录过程中发生错误，请重试。'}
          </div>
          <div className="text-sm mt-2">
            错误代码: {error}
          </div>
          {callbackUrl && (
            <div className="text-sm mt-1">
              目标页面: {callbackUrl}
            </div>
          )}
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