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
        return 'Server configuration error. Please contact the administrator.';
      case 'AccessDenied':
        return 'Access denied. You may not have permission to access this resource.';
      case 'Verification':
        return 'The verification link is invalid or has expired.';
      case 'Callback':
        return 'An error occurred during the authentication callback.';
      default:
        return 'An error occurred during the login process.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Head>
        <title>Login Error - AI Photo Restorer</title>
      </Head>
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login Error
          </h2>
          <div className="mt-4">
            <div className="text-red-600 text-center">
              {getErrorMessage(error as string)}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Error Code: {error}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
} 