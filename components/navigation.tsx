'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {Menu, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ThemeToggle} from '@/components/theme-toggle';
import {LanguageToggle} from '@/components/language-toggle';
import {cn} from '@/lib/utils';
import {useTranslation} from '@/app/i18n/translation-context';
import {useParams} from 'next/navigation';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('/');
    const t = useTranslation();
    const {lang} = useParams();

    if (!t.nav) {
        return null;
    }

    function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
        setActiveItem('#');
    }

    function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        window.location.href = `/${lang}`;
    }

    const navItems = [
        {href: '#features', label: t.nav.features},
        {href: '#products', label: t.nav.products},
        {href: '#pricing', label: t.nav.pricing},
        {href: '#faq', label: t.nav.faq},
        {href: '#contact', label: t.nav.contact},
    ];

    return (
        <nav className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href={`/${lang}`}
                        onClick={goHome}
                        className="flex items-center space-x-2"
                    >
                        <span className="text-xl font-bold">AI Matting Pro</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="#"
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary',
                                activeItem === '#' ? 'text-primary' : 'text-muted-foreground'
                            )}
                            onClick={scrollToTop}
                        >
                            {t.nav.home}
                        </Link>
                        {navItems.map((item) => {
                            const linkProps = {
                                href: item.href,
                                className: cn(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    activeItem === item.href
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                ),
                                onClick: () => setActiveItem(item.href),
                            };
                            return (
                                <Link key={item.href} {...linkProps}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle/>
                        <LanguageToggle/>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                    </Button>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        className="md:hidden py-4"
                    >
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="#"
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md',
                                    activeItem === '#'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground'
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToTop(e);
                                    setIsOpen(false);
                                }}
                            >
                                {t.nav.home}
                            </Link>

                            {navItems.map((item) => {
                                const linkProps = {
                                    href: item.href,
                                    className: cn(
                                        'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md',
                                        activeItem === item.href
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground'
                                    ),
                                    onClick: () => {
                                        setActiveItem(item.href);
                                        setIsOpen(false);
                                    },
                                };
                                return (
                                    <Link key={item.href} {...linkProps}>
                                        {item.label}
                                    </Link>
                                );
                            })}

                            <div className="flex items-center space-x-4 px-4 pt-4 border-t">
                                <ThemeToggle/>
                                <LanguageToggle/>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}