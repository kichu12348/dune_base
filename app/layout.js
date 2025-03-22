import "./globals.css";
import { ScoreProvider } from "./contexts/scoreContext";

export const metadata = {
  title: "UTSAV 2025 | College of Engineering Chengannur",
  description: "UTSAV 2025 - The Annual Techno-Cultural Festival of College of Engineering Chengannur (CEC)",
  icons: {
    apple: '/apple-touch-icon.png',
    favicons: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'UTSAV 2025 | CEC',
    description: 'UTSAV 2025 - The Annual Techno-Cultural Festival of College of Engineering Chengannur (CEC)',
    images: '/favicon.svg',
    type: 'website',
    siteName: 'UTSAV 2025 CEC',
    locale: 'en_US',
  },
  keywords: ['UTSAV', 'College of Engineering Chengannur', 'CEC', 'techno-cultural fest', 'kerala', 'engineering college', 'technical festival'],
  authors: [{ name: 'College of Engineering Chengannur' }],
  creator: 'College of Engineering Chengannur',
  publisher: 'College of Engineering Chengannur',
  robots: 'index, follow'
};

export const viewport={
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1.0',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black-translucent'
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
