import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { getDictionary } from './i18n/get-dictionary';
import { TranslationProvider } from './i18n/translation-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Image Matting - Professional Background Removal',
  description: 'Remove image backgrounds instantly with AI technology',
};

async function getDefaultDictionary() {
  const dictionary = await getDictionary('en');
  return dictionary;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDefaultDictionary();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <TranslationProvider dictionary={dictionary}>
            {children}
          </TranslationProvider>
        </Providers>
      </body>
    </html>
  );
}