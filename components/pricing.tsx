'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/app/i18n/translation-context';

export function Pricing() {
  const t = useTranslation();

  const pricingPlans = [
    {
      id: 'free',
      popular: false,
    },
    {
      id: 'pro',
      popular: true,
    },
    {
      id: 'enterprise',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.pricing.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const content = t.pricing[plan.id];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full ${
                    plan.popular
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-border'
                  }`}
                >
                  <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">{content.price}</span>
                      {content.price !== t.pricing.enterprise.price && <span>/month</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {content.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center space-x-2">
                          <span>✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${
                        plan.popular
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      {t.pricing.getStarted}
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