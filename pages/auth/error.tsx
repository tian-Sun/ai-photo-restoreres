import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Head>
        <title>错误 - AI Photo Restorer</title>
      </Head>
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-red-500">登录失败</h1>
        <p className="text-gray-600">
          {error === 'Callback'
            ? '登录回调验证失败，请重试。'
            : '发生了未知错误，请重试。'}
        </p>
        <Link
          href="/"
          className="rounded-lg bg-black px-10 py-2 text-white transition-colors hover:bg-gray-800"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
} 