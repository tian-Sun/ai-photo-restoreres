import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Header({ photo }: { photo?: string | undefined }) {
  return (
    <header className='flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2'>
      <a href='/' className='flex space-x-2'>
        <div className='flex space-x-2'>
          <Image
            alt='header text'
            src='/logo.png'
            className='sm:w-32 sm:h-32 w-32 h-32'
            width={32}
            height={32}
          />
          <h1 className='sm:text-3xl text-xl font-bold ml-2 tracking-tight'>
          facephotorestore.online
          </h1>
        </div>
      </a>
      <div className="flex items-center space-x-4">
        {photo ? (
          <div className="flex items-center space-x-2">
            <Image
              alt="Profile"
              src={photo}
              width={40}
              height={40}
              className="rounded-full"
            />
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Free Trial
            </button>
          </div>
        ) : (
          <Link href="/auth/signin" className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
            <span>Free Trial</span>
          </Link>
        )}
      </div>
    </header>
  );
}
