import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - AI Photo Enhancement</title>
        <meta name="description" content="Terms of Service for AI Photo Enhancement service" />
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="text-left space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this AI Photo Enhancement service, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                This service provides AI-powered photo enhancement and restoration capabilities. Users can upload photos to improve their quality, restore damaged areas, and enhance overall appearance using artificial intelligence technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Usage Limits</h2>
              <p className="text-gray-700 leading-relaxed">
                Users are limited to a specified number of photo enhancements per day. The service reserves the right to modify these limits at any time. Users must not attempt to circumvent these limitations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
              <ul className="text-gray-700 leading-relaxed list-disc pl-6 space-y-2">
                <li>You must only upload photos that you own or have permission to use</li>
                <li>You are responsible for the content you upload and process</li>
                <li>You must not use the service for any illegal or harmful purposes</li>
                <li>You must not attempt to reverse engineer or interfere with the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Privacy and Data</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. By using this service, you consent to our data practices as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. The service may be temporarily unavailable for maintenance or due to technical issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                The service is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of this service, including but not limited to data loss, service interruptions, or unsatisfactory results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at wendy.1031ht@gmail.com.
              </p>
            </section>

            <section className="pt-6">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 