'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const footerSections = [
  {
    title: 'footer.company.title',
    links: [
      { label: 'footer.company.about', href: '/about' },
      { label: 'footer.company.careers', href: '/careers' },
      { label: 'footer.company.press', href: '/press' },
    ],
  },
  {
    title: 'footer.product.title',
    links: [
      { label: 'footer.product.features', href: '/features' },
      { label: 'footer.product.pricing', href: '/pricing' },
      { label: 'footer.product.api', href: '/api' },
    ],
  },
  {
    title: 'footer.resources.title',
    links: [
      { label: 'footer.resources.docs', href: '/docs' },
      { label: 'footer.resources.blog', href: '/blog' },
      { label: 'footer.resources.help', href: '/help' },
    ],
  },
  {
    title: 'footer.legal.title',
    links: [
      { label: 'footer.legal.privacy', href: '/privacy' },
      { label: 'footer.legal.terms', href: '/terms' },
      { label: 'footer.legal.cookies', href: '/cookies' },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
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
              footer.copyright
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