import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentSuccess: NextPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // 5秒后自动跳转到首页
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Head>
        <title>Payment Successful - AI Photo Restorer</title>
        <meta name="description" content="Your payment was successful. Welcome to Pro!" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for upgrading to Pro! Your subscription is now active.
          </p>

          {/* Pro Features */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Your Pro Benefits:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 500 face photo restorations per month</li>
              <li>• Priority processing</li>
              <li>• Advanced facial AI models</li>
              <li>• Cancel anytime</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/restore"
              className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Start Restoring Photos
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>

          {/* Auto Redirect Notice */}
          <p className="text-sm text-gray-500 mt-4">
            Redirecting to home page in {countdown} seconds...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess; 