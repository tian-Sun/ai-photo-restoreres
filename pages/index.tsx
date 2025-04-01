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
        <title>AI Face Photo Restorer</title>
      </Head>
      <Header />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-20'>
        <h1 className='mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl'>
          Transform Your Photos{' '}
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
    </div>
  );
};

export default Home;
