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
    <SessionProvider session={session}>
      <PlausibleProvider domain='restorephotos.io'>
        <Component {...pageProps} />
      </PlausibleProvider>
    </SessionProvider>
  );
}

export default MyApp;
