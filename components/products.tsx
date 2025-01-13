'use client';

import {motion} from 'framer-motion';
import {ImageOff, UserSquare2, ArrowRight} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/app/i18n/translation-context';

const products = [
    {
        id: 'bg-removal',
        title: 'AI智能抠图/去除背景',
        description: '一键智能去除背景，保留完整细节',
        features: [
            '智能识别前景主体',
            '精准处理毛发边缘',
            '批量处理支持',
            '透明背景输出'
        ],
        icon: <ImageOff className="h-6 w-6"/>,
        buttonText: '立即使用',
        demoImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'id-photo',
        title: 'AI智能证件照制作',
        description: '快速生成标准证件照，支持多种规格',
        features: [
            '智能人像优化',
            '标准规格裁剪',
            '多种底色可选',
            '实时预览效果'
        ],
        icon: <UserSquare2 className="h-6 w-6"/>,
        buttonText: '开始制作',
        demoImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=800&q=80'
    }
];

export function Products() {
    const t = useTranslation();

    return (
        <section id="products" className="py-16 bg-gradient-to-b from-background to-muted/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    {t.productsPage.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product) => {
                        const content = product.id === 'bg-removal'
                          ? t.productsPage.bgRemoval
                          : t.productsPage.idPhoto;

                        return (
                            <motion.div
                                key={product.id}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                viewport={{once: true}}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center space-x-2">
                                            {product.icon}
                                            <CardTitle>{content.title}</CardTitle>
                                        </div>
                                        <CardDescription>
                                            {content.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-6">
                                            <img
                                                src={product.demoImage}
                                                alt={content.title}
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                            <ul className="space-y-2">
                                                {content.features.map((feature: string, index: number) => (
                                                    <li key={index} className="flex items-center space-x-2">
                                                        <span className="text-primary">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Button className="w-full group">
                                            {content.buttonText}
                                            <ArrowRight
                                                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                            />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}