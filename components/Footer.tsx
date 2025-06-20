import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3'>
      <div>
        Powered by{' '}
        <a
          href='https://replicate.com/'
          target='_blank'
          className='font-bold transition hover:text-black/50'
        >
          Replicate{' '}
        </a>
        and{' '}
        <a
          href='https://www.bytescale.com/'
          target='_blank'
          className='font-bold transition hover:text-black/50'
        >
          Bytescale
        </a>
        . Created by{' '}
        <a
          href='https://x.com/wendy_Tianf'
          target='_blank'
          className='font-bold transition hover:text-black/50'
        >
          Wendy
        </a>{' '}
        (wendy.1031ht@gmail.com).
      </div>
      <div className='flex space-x-4 pb-4 sm:pb-0 pr-6'>
        <Link
          href='/terms'
          className='text-sm text-gray-600 hover:text-gray-800 transition-colors'
        >
          Terms of Service
        </Link>
        <Link
          href='/privacy'
          className='text-sm text-gray-600 hover:text-gray-800 transition-colors'
        >
          Privacy Policy
        </Link>
        <Link
          href='https://x.com/wendy_Tianf'
          className='group'
          aria-label='Wendy on Twitter'
        >
          <svg
            aria-hidden='true'
            className='h-6 w-6 fill-slate-500 group-hover:fill-slate-700'
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.162 5.656c-.793.352-1.646.59-2.542.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.466 4.466 0 0 0 16.616 4c-2.466 0-4.466 2-4.466 4.466 0 .35.04.692.116 1.02C8.08 9.33 5.1 7.89 3.02 5.67c-.384.66-.604 1.426-.604 2.244 0 1.548.788 2.915 1.99 3.717a4.48 4.48 0 0 1-2.022-.56v.057c0 2.163 1.54 3.97 3.584 4.377-.375.102-.77.157-1.178.157-.288 0-.566-.028-.838-.08.567 1.77 2.213 3.06 4.166 3.094A8.96 8.96 0 0 1 2 19.54a12.66 12.66 0 0 0 6.84 2.006c8.208 0 12.707-6.8 12.707-12.707 0-.193-.004-.386-.013-.577a9.07 9.07 0 0 0 2.228-2.306z" />
          </svg>
        </Link>
       
      </div>
    </footer>
  );
}
