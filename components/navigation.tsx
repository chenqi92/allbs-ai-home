'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/app/i18n/translation-context';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const t = useTranslation();

  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#products', label: t.nav.products },
    { href: '#features', label: t.nav.features },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">AI Matting</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  activeItem === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
                onClick={() => setActiveItem(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme and Language Toggles */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md',
                    activeItem === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => {
                    setActiveItem(item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 px-4 pt-4 border-t">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}