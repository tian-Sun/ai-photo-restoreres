import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl, error } = router.query;

  console.log('SignIn Page Props:', {
    callbackUrl,
    error,
    query: router.query,
    pathname: router.pathname,
    asPath: router.asPath
  });

  const handleSignIn = async () => {
    console.log('Attempting to sign in with Google');
    try {
      const result = await signIn('google', { 
        callbackUrl: callbackUrl as string || '/restore',
        redirect: true
      });
      console.log('SignIn Result:', result);
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
          登录错误: {error}
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