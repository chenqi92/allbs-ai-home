'use client';

import { useTranslation } from '@/app/i18n/translation-context';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';

export default function CareersPage() {
  const t = useTranslation();
  const { lang } = useParams();

  return (
    <div>
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">{t.careers.title}</h1>
        <p className="text-muted-foreground mb-8">{t.careers.description}</p>

        <p>
          ({t.common.currentLanguage}: {lang})
        </p>
      </div>
    </div>
  );
} 