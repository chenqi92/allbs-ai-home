'use client';

import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/app/i18n/translation-context';

export function Features() {
  const t = useTranslation();

  return (
    <section id="features" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            'imageProcessing',
            'idPhoto',
            'filePreview',
            'batchProcessing',
            'aiEnhancement',
            'cloudStorage'
          ].map((featureKey, index) => (
            <motion.div
              key={featureKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wand2 className="h-5 w-5" />
                    <span>{t.features[featureKey].title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t.features[featureKey].description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}