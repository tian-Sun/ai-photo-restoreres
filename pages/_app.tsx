import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { Session } from 'next-auth';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={true}
    >
      <PlausibleProvider domain='ai-photo-restoreres.vercel.app'>
        <Component {...pageProps} />
      </PlausibleProvider>
    </SessionProvider>
  );
}

export default MyApp;
