import './globals.css';
import { PortfolioDataProvider } from '../src/context/PortfolioDataContext';
import { NextClientWrapper } from '../src/components/NextClientWrapper';

export const metadata = {
  title: 'Md. Sahadat Hossain — Software Architect & Full Stack Developer',
  description:
    'Architectural software engineer building scalable web applications, distributed systems, and futuristic cyber digital interfaces.',
  icons: {
    icon: '/assets/img/stl-s-logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-black text-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-chakra antialiased selection:bg-[#00F0FF] selection:text-black min-h-screen overflow-x-clip relative">
        <PortfolioDataProvider>
          <NextClientWrapper>{children}</NextClientWrapper>
        </PortfolioDataProvider>
      </body>
    </html>
  );
}
