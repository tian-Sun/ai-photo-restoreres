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
        <title>Restore Old Photos Online for Free | AI Photo Restoration Tool - Face Photo Restore
        </title>
        <meta name="description" content="Face Photo Restore is an AI-powered online tool that restores blurry, damaged, faded, or black-and-white photos for free. Recover deleted photos from iPhone, Android, iCloud, Google Photos, and more — no software or login required." />
        <meta name="keywords" content="restore old photos, ai photo restore, free online photo restoration, photo recovery iphone, repair blurry photos, old photo enhancer, damaged photo fix" />
      </Head>
      <Header />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-20'>
        <h1 className='mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl'>
        Bring Your Old Memories Back to Life
        {' '}
          <span className='relative whitespace-nowrap text-[#3290EE]'>
            <SquigglyLines />
            <span className='relative'>with AI Magic</span>
          </span>
        </h1>

        <p className='mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7'>
          Experience the power of AI in photo enhancement. Our advanced technology helps restore and improve your precious memories with professional quality results.
        </p>
        
        <div className='flex justify-center space-x-4'>
          <a
            className='bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80'
            href='/restore'
          >Restore Now
          </a>
        </div>

        <div className='flex justify-between items-center w-full flex-col sm:mt-10 mt-6'>
          <div className='flex flex-col space-y-10 mt-4 mb-16'>
            <div className='flex sm:space-x-8 sm:flex-row flex-col'>
              <div>
                <h2 className='mb-1 font-medium text-lg'>Before Enhancement</h2>
                <Image
                  alt='Original photo example'
                  src='/michael.png'
                  className='w-96 h-96 rounded-2xl shadow-lg'
                  width={400}
                  height={400}
                />
              </div>
              <div className='sm:mt-0 mt-8'>
                <h2 className='mb-1 font-medium text-lg'>After Enhancement</h2>
                <Image
                  alt='Enhanced photo example'
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
      <Footer />
      <section className="max-w-4xl mx-auto px-4 py-12 text-left">
        <h2 className="text-2xl font-bold mt-12 mb-4">Restore All Kinds of Damaged Photos</h2>
        <p className="mb-2 text-lg">Fix Blurry, Faded, Torn, and Black-and-White Pictures with AI</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Photo Damage Types We Fix</h3>
        <ul className="list-disc pl-6 mb-4 text-base">
          <li>Can AI repair torn or scratched photos?</li>
          <li>How to restore heavily faded black-and-white images?</li>
          <li>What about pixelated or low-resolution old photos?</li>
        </ul>
        <h2 className="text-2xl font-bold mt-12 mb-4">Recover Photos from Any Device or Cloud</h2>
        <p className="mb-2 text-lg">iPhone, Android, iCloud, Google Photos — We've Got You Covered</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Photo Source Recovery Tips</h3>
        <ul className="list-disc pl-6 mb-4 text-base">
          <li>Restore recently deleted photos from iPhone or Android</li>
          <li>Recover photos emptied from Google Photos bin</li>
          <li>Restore lost pictures from iCloud or OneDrive</li>
        </ul>
        <h2 className="text-2xl font-bold mt-12 mb-4">Why Use Face Photo Restore?</h2>
        <p className="mb-2 text-lg">100% Free | No Signup | Powered by AI | One-Click Repair</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Tech Highlights</h3>
        <ul className="list-disc pl-6 mb-4 text-base">
          <li>State-of-the-art AI model, including HuggingFace & local deployment</li>
          <li>No need for Photoshop or photo editing skills</li>
          <li>Supports photo colorization and upscaling</li>
        </ul>
        <h2 className="text-2xl font-bold mt-12 mb-4">Frequently Asked Questions</h2>
        <p className="mb-2 text-lg">Can AI Really Fix My Old Photos? What If My Photos Were Deleted Years Ago?</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">User Questions</h3>
        <ul className="list-disc pl-6 mb-4 text-base">
          <li>Is it really free to use?</li>
          <li>Can I restore multiple photos at once?</li>
          <li>Is my uploaded photo safe and private?</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
