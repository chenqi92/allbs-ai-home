'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface LanguageInfo {
  code: string;
  label: string;
}

const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  // ...可继续添加其他语言
];

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  let currentLang = 'en';
  if (pathname.startsWith('/zh')) {
    currentLang = 'zh';
  } else if (pathname.startsWith('/fr')) {
    currentLang = 'fr';
  }

  function handleChangeLanguage(nextLang: string) {
    if (currentLang === nextLang) return;

    let newPath = pathname
      .replace(/^\/(en|zh|fr)/, '')
      .replace(/^\/+/, '');

    newPath = `/${nextLang}/${newPath}`;

    router.push(newPath);
  }

  const currentLabel =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLang)?.label ||
    'Language';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="uppercase">
          {currentLabel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>选择语言</DropdownMenuLabel>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
            className="cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}