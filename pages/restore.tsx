import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { UrlBuilder } from '@bytescale/sdk';
import {
  UploadWidgetConfig,
  UploadWidgetOnPreUploadResult,
} from '@bytescale/upload-widget';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { CompareSlider } from '../components/CompareSlider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingDots from '../components/LoadingDots';
import Toggle from '../components/Toggle';
import appendNewToName from '../utils/appendNewToName';
import downloadPhoto from '../utils/downloadPhoto';
import { useSession, signIn } from 'next-auth/react';
import useSWR from 'swr';
import { Rings } from 'react-loader-spinner';

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR('/api/remaining', fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
    shouldRetryOnError: true
  });
  const { data: session, status } = useSession();

  const DAILY_USAGE_LIMIT = 2;

  const getTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const options: UploadWidgetConfig = {
    apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
      : 'free',
    maxFileCount: 1,
    mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    editor: { images: { crop: false } },
    styles: { colors: { primary: '#000' } },
    layout: 'modal',
    onPreUpload: async (
      file: File
    ): Promise<UploadWidgetOnPreUploadResult | undefined> => {
      await mutate();
      
      if (!data || data.remainingGenerations <= 0) {
        return {
          errorMessage: 'No more generations left for the day.'
        };
      }
      return undefined;
    },
  };

  const UploadDropZone = () => (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-[670px]">
        <UploadDropzone
          options={options}
          onUpdate={({ uploadedFiles }) => {
            if (uploadedFiles.length !== 0) {
              const image = uploadedFiles[0];
              const imageName = image.originalFile.originalFileName;
              const imageUrl = UrlBuilder.url({
                accountId: image.accountId,
                filePath: image.filePath,
                options: {
                  transformation: 'preset',
                  transformationPreset: 'thumbnail',
                },
              });
              setPhotoName(imageName);
              setOriginalPhoto(imageUrl);
              generatePhoto(imageUrl);
            }
          }}
          width='670px'
          height='250px'
        />
        {(!data || data.remainingGenerations <= 0) && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 border-2 border-red-400 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>No more generations left for the day.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: fileUrl }),
      });

      const response = await res.json();
      
      if (!response.success) {
        setError(response.error);
        setLoading(false);
        await mutate();
        return;
      }

      setRestoredImage(response.data);
      setRestoredLoaded(true);
      await mutate();
    } catch (error) {
      setError('Failed to process image. Please try again.');
      await mutate();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <Head>
        <title>Restore Photos</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header photo={session?.user?.image || undefined} />
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8'>
        <h1 className='mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5'>
          Restore any face photo
        </h1>
        {status === 'authenticated' && data && (
          <p className='text-slate-500'>
            You have{' '}
            <span className='font-semibold'>
              {data.remainingGenerations} generations
            </span>{' '}
            left.
          </p>
        )}
        <div className='flex justify-between items-center w-full flex-col mt-4'>
          <Toggle
            className={`${restoredLoaded ? 'visible mb-6' : 'invisible'}`}
            sideBySide={sideBySide}
            setSideBySide={(newVal) => setSideBySide(newVal)}
          />
          {restoredLoaded && sideBySide && (
            <CompareSlider
              original={originalPhoto!}
              restored={restoredImage!}
            />
          )}
          {status === 'loading' ? (
            <div className='max-w-[670px] h-[250px] flex justify-center items-center'>
              <Rings
                height='100'
                width='100'
                color='black'
                radius='6'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
                ariaLabel='rings-loading'
              />
            </div>
          ) : status === 'authenticated' && !originalPhoto ? (
            <UploadDropZone />
          ) : (
            !originalPhoto && (
              <div className='h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8'>
                <div className='max-w-xl text-gray-600'>
                  Sign in below with Google to create a free account and restore
                  your photos today. You will be able to restore 2 photos per
                  day for free.
                </div>
                <button
                  onClick={() => signIn('google')}
                  className='bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2'
                >
                  <Image
                    src='/google.png'
                    width={20}
                    height={20}
                    alt="google's logo"
                  />
                  <span>Sign in with Google</span>
                </button>
              </div>
            )
          )}
          {originalPhoto && !restoredImage && (
            <Image
              alt='original photo'
              src={originalPhoto}
              className='rounded-2xl'
              width={475}
              height={475}
            />
          )}
          {restoredImage && originalPhoto && !sideBySide && (
            <div className='flex sm:space-x-4 sm:flex-row flex-col space-y-4 sm:space-y-0 w-full'>
              <div>
                <h2 className='mb-1 font-medium text-lg'>Original Photo</h2>
                <Image
                  alt='original photo'
                  src={originalPhoto}
                  className='rounded-2xl relative'
                  width={475}
                  height={475}
                />
              </div>
              <div>
                <h2 className='mb-1 font-medium text-lg'>Restored Photo</h2>
                <a href={restoredImage} target='_blank' rel='noreferrer'>
                  <Image
                    alt='restored photo'
                    src={restoredImage}
                    className='rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in'
                    width={475}
                    height={475}
                    onLoadingComplete={() => setRestoredLoaded(true)}
                  />
                </a>
              </div>
            </div>
          )}
          {loading && (
            <button
              disabled
              className='bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40'
            >
              <span className='pt-4'>
                <LoadingDots color="white" />
              </span>
            </button>
          )}
          {error && (
            <div
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4'
              role='alert'
            >
              <span className='block sm:inline'>{error}</span>
            </div>
          )}
          <div className='flex justify-center max-w-2xl'>
            <p className='text-sm text-gray-500'>
              Have another photo?{' '}
              <button
                className='font-semibold text-black border-b-2 hover:border-gray-300 transition-all'
                onClick={() => {
                  setOriginalPhoto(null);
                  setRestoredImage(null);
                  setRestoredLoaded(false);
                  setError(null);
                }}
              >
                Restore another photo
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
