'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import {Mail, ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {useTranslation} from '@/app/i18n/translation-context';
import {useParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';

export default function RecoverPassword() {
    const t = useTranslation();
    const params = useParams();
    const lang = params.lang as string;
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError(t.auth.recoverPassword.emailRequired);
            return;
        }

        try {
            // Here you would typically make an API call to handle password recovery
            // For demo purposes, we'll just simulate success
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitted(true);
        } catch (err) {
            setError(t.auth.recoverPassword.sendFailed);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="w-full max-w-md"
            >
                <Card className="border-none shadow-lg">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Link href={`/${lang}`} className="text-muted-foreground hover:text-primary">
                                <ArrowLeft className="h-4 w-4"/>
                            </Link>
                            <CardTitle className="text-2xl">{t.auth.recoverPassword.title}</CardTitle>
                        </div>
                        <CardDescription>
                            {t.auth.recoverPassword.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t.auth.emailLabel}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t.auth.recoverPassword.emailPlaceholder}
                                            className="pl-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="w-full">
                                    {t.auth.recoverPassword.sendButton}
                                </Button>

                                <div className="text-center">
                                    <Link
                                        href={`/${lang}`}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {t.auth.recoverPassword.backToLogin}
                                    </Link>
                                </div>
                            </form>
                        ) : (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                className="space-y-4"
                            >
                                <Alert>
                                    <AlertDescription>
                                        {t.auth.recoverPassword.sendSuccess}
                                    </AlertDescription>
                                </Alert>
                                <div className="text-center space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        {t.auth.recoverPassword.checkSpam}
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-primary hover:underline ml-1"
                                        >
                                            {t.auth.recoverPassword.resend}
                                        </button>
                                    </p>
                                    <Link href={`/${lang}`}>
                                        <Button variant="outline" className="w-full">
                                            {t.auth.recoverPassword.backToHome}
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}