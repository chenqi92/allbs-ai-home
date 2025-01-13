'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useTranslation } from '@/app/i18n/translation-context';

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslation();

  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {t.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t.hero.subtitle}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {t.hero.cta}
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}