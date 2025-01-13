'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Home} from 'lucide-react';
import {useTranslation} from '@/app/i18n/translation-context';
import {useParams} from 'next/navigation';

export default function NotFound() {
    const t = useTranslation();
    const params = useParams();
    const lang = params.lang as string;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="text-center space-y-6"
            >
                <h1 className="text-9xl font-bold text-primary">{t.notFound.title}</h1>
                <h2 className="text-2xl font-semibold">{t.notFound.heading}</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    {t.notFound.description}
                </p>
                <Link href={`/${lang}`}>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Home className="mr-2 h-4 w-4"/>
                        {t.notFound.backToHome}
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}