'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from '@/app/i18n/translation-context';

export function Footer() {
  const t = useTranslation();

  const footerSections = [
    {
      title: t.footer.company.title,
      links: [
        { label: t.footer.company.about, href: '/about' },
        { label: t.footer.company.careers, href: '/careers' },
        { label: t.footer.company.press, href: '/press' },
      ],
    },
    {
      title: t.footer.product.title,
      links: [
        { label: t.footer.product.features, href: '/features' },
        { label: t.footer.product.pricing, href: '/pricing' },
        { label: t.footer.product.api, href: '/api' },
      ],
    },
    {
      title: t.footer.resources.title,
      links: [
        { label: t.footer.resources.docs, href: '/docs' },
        { label: t.footer.resources.blog, href: '/blog' },
        { label: t.footer.resources.help, href: '/help' },
      ],
    },
    {
      title: t.footer.legal.title,
      links: [
        { label: t.footer.legal.privacy, href: '/privacy' },
        { label: t.footer.legal.terms, href: '/terms' },
        { label: t.footer.legal.cookies, href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}