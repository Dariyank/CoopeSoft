// app/LandingPage/layout.tsx
'use client';

import Head from "next/head";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="es">
        <Head>
          <title>Landing Page</title>
          <meta name="description" content="Landing page de Coopesoft" />
        </Head>
        <body>
        <main>{children}</main> 
        </body>
        
      </html>
    );
}