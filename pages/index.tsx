import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SquigglyLines from '../components/SquigglyLines';
import { Testimonials } from '../components/Testimonials';

const Home: NextPage = () => {
  return (
    <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <Head>
        <title>Face Photo Restore - AI Face Enhancement & Restoration | Free Online Tool
        </title>
        <meta name="description" content="Face Photo Restore transforms blurry, damaged, and faded face photos with AI-powered face enhancement. Specialized in facial restoration, bringing old portraits back to life with crystal-clear results." />
        <meta name="keywords" content="face photo restore, face enhancement, ai face restore, blurry face fix, old photo restoration, facial photo repair, portrait enhancement, ai face improvement" />
      </Head>
      <Header />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-20'>
        <h1 className='mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl'>
        Face Photo Restore:
        {' '}
          <span className='relative whitespace-nowrap text-[#3290EE]'>
            <SquigglyLines />
            <span className='relative'>Transform Faces Into Clear</span>
          </span>
        </h1>

        <p className='mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7'>
          Face Photo Restore specializes in AI-powered facial enhancement and restoration. Turn blurry, damaged, or faded face photos into sharp, clear portraits that bring your memories back to life.
        </p>
        
        <div className='flex justify-center space-x-4'>
          <a
            className='bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80'
            href='/restore'
          >Start Face Photo Restore
          </a>
        </div>

        <div className='flex justify-between items-center w-full flex-col sm:mt-10 mt-6'>
          <div className='flex flex-col space-y-10 mt-4 mb-16'>
            <div className='flex sm:space-x-8 sm:flex-row flex-col'>
              <div>
                <h2 className='mb-1 font-medium text-lg'>Before Face Photo Restore</h2>
                <Image
                  alt='Blurry face photo before Face Photo Restore enhancement'
                  src='/michael.png'
                  className='w-96 h-96 rounded-2xl shadow-lg'
                  width={400}
                  height={400}
                />
              </div>
              <div className='sm:mt-0 mt-8'>
                <h2 className='mb-1 font-medium text-lg'>After Face Photo Restore</h2>
                <Image
                  alt='Enhanced face photo after Face Photo Restore processing'
                  width={400}
                  height={400}
                  src='/michael-new.png'
                  className='w-96 h-96 rounded-2xl shadow-lg sm:mt-0 mt-2'
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Pricing Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Choose Your Face Photo Restore Plan</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Face Photo Restore</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$0</div>
              <p className="text-gray-600 mb-6">Perfect for occasional face photo restoration</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">2 face photo restorations per day</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">AI-powered facial restoration</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">No credit card required</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Instant access to Face Photo Restore</span>
              </li>
            </ul>
            <div className="text-center">
              <Link href="/restore" className="inline-block bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                Start Free Face Photo Restore
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-500 relative hover:border-blue-600 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Face Photo Restore</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$15</div>
              <p className="text-gray-600 mb-6">per month</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">500 face photo restorations per month</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Priority processing</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Advanced facial AI models</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Cancel anytime</span>
              </li>
            </ul>
            <div className="text-center">
              <Link href="/restore" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Upgrade to Pro Face Photo Restore
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            All Face Photo Restore plans include secure processing and privacy protection. 
            <Link href="/privacy" className="text-blue-600 hover:underline ml-1">Learn more</Link>
          </p>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto px-6 py-12 mb-12 bg-white/80 rounded-2xl shadow-lg border border-gray-100">
        <hr className="mb-8 border-gray-200" />
        <h2 className="text-3xl font-extrabold mt-8 mb-4 text-gray-900">Face Photo Restore: Specialized in Facial Enhancement</h2>
        <p className="mb-4 text-lg text-gray-700">Transform Blurry, Damaged, and Faded Face Photos with AI-Powered Face Photo Restore</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">What Face Photo Restore AI Can Fix</h3>
        <ul className="list-none pl-0 mb-6 text-base text-gray-700 space-y-2">
          <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Blurry and out-of-focus faces</li>
          <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Damaged or scratched facial features</li>
          <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Faded and low-contrast portraits</li>
          <li className="flex items-start"><span className="mr-2 text-blue-500">•</span>Pixelated and low-resolution faces</li>
        </ul>
        <hr className="my-8 border-gray-200" />
        <h2 className="text-3xl font-extrabold mt-8 mb-4 text-gray-900">Perfect for Any Portrait Source</h2>
        <p className="mb-4 text-lg text-gray-700">Face Photo Restore Works with Photos from iPhone, Android, Old Cameras, and More</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Ideal Photos for Face Photo Restore</h3>
        <ul className="list-none pl-0 mb-6 text-base text-gray-700 space-y-2">
          <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Old family portraits and vintage photos</li>
          <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Blurry smartphone selfies and group shots</li>
          <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Damaged photos from albums or storage</li>
          <li className="flex items-start"><span className="mr-2 text-green-500">•</span>Low-quality social media profile pictures</li>
        </ul>
        <hr className="my-8 border-gray-200" />
        <h2 className="text-3xl font-extrabold mt-8 mb-4 text-gray-900">Why Choose Face Photo Restore?</h2>
        <p className="mb-4 text-lg text-gray-700">Specialized AI | No Technical Skills Required | Instant Results</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Face Photo Restore Key Features</h3>
        <ul className="list-none pl-0 mb-6 text-base text-gray-700 space-y-2">
          <li className="flex items-start"><span className="mr-2 text-purple-500">•</span>AI specifically trained for facial enhancement</li>
          <li className="flex items-start"><span className="mr-2 text-purple-500">•</span>Preserves natural facial features and expressions</li>
          <li className="flex items-start"><span className="mr-2 text-purple-500">•</span>One-click processing - no editing skills needed</li>
          <li className="flex items-start"><span className="mr-2 text-purple-500">•</span>Maintains photo authenticity while improving clarity</li>
        </ul>
        <hr className="my-8 border-gray-200" />
        <h2 className="text-3xl font-extrabold mt-8 mb-4 text-gray-900">Face Photo Restore FAQ</h2>
        <p className="mb-4 text-lg text-gray-700">How Does Face Photo Restore Work? Will It Look Natural?</p>
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Common Face Photo Restore Questions</h3>
        <ul className="list-none pl-0 mb-2 text-base text-gray-700 space-y-2">
          <li className="flex items-start"><span className="mr-2 text-orange-500">•</span>Is Face Photo Restore really free to try?</li>
          <li className="flex items-start"><span className="mr-2 text-orange-500">•</span>Will the Face Photo Restore result look natural and realistic?</li>
          <li className="flex items-start"><span className="mr-2 text-orange-500">•</span>How long does Face Photo Restore take to process a face photo?</li>
          <li className="flex items-start"><span className="mr-2 text-orange-500">•</span>Can Face Photo Restore enhance multiple faces in one photo?</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
