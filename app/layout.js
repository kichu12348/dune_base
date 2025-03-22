import "./globals.css";
import { ScoreProvider } from "./contexts/scoreContext";

export const metadata = {
  title: "UTSAV 2025",
  description: "UTSAV 2025",
  icons: {
    apple: '/apple-touch-icon.png',
    favicons: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'UTSAV 2025',
    description: 'UTSAV 2025',
    images: '/favicon.svg',
    type: 'website',
    siteName: 'UTSAV 2025',
    locale: 'en_US',
  },
};

export const viewport={
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScoreProvider>
        {children}
        </ ScoreProvider>
      </body>
    </html>
  );
}
