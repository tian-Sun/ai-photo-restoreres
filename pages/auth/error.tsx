import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  console.log('Auth Error Page:', {
    error,
    query: router.query,
    pathname: router.pathname,
    asPath: router.asPath
  });

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'Configuration':
        return '服务器配置错误。请联系管理员。';
      case 'AccessDenied':
        return '访问被拒绝。您可能没有权限访问此资源。';
      case 'Verification':
        return '验证链接无效或已过期。';
      case 'Callback':
        return '认证回调过程中出现错误。';
      default:
        return '登录过程中发生错误。';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Head>
        <title>登录错误 - AI Photo Restorer</title>
      </Head>
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            登录错误
          </h2>
          <div className="mt-4">
            <div className="text-red-600 text-center">
              {getErrorMessage(error as string)}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              错误代码: {error}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            返回登录
          </button>
        </div>
      </div>
    </div>
  );
} 