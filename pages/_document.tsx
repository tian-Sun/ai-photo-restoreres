import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='Restore your old face photos and keep the memories alive.'
          />
          <meta property='og:site_name' content='restorePhotos.io' />
          <meta
            property='og:description'
            content='Restore your old face photos and keep the memories alive.'
          />
          <meta property='og:title' content='Face Photo Restorer' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Face Photo Restorer' />
          <meta
            name='twitter:description'
            content='Restore your old photos and keep the memories alive.'
          />
          <meta
            property='og:image'
            content='https://restore-photos.vercel.app/og-image.png'
          />
          <meta
            name='twitter:image'
            content='https://restore-photos.vercel.app/og-image.png'
          />
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-8MCV4WV1JK"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-8MCV4WV1JK');
              `,
            }}
          />
          {/* Microsoft Clarity */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "rxro86l9zu");
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
