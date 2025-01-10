import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '../providers';
import { languages } from '../i18n/settings';
import { getDictionary } from '../i18n/get-dictionary';
import { TranslationProvider } from '../i18n/translation-context';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: 'AI Image Matting - Professional Background Removal',
  description: 'Remove image backgrounds instantly with AI technology',
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
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