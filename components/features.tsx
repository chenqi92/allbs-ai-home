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

const features = [
  {
    title: 'Pixel-Perfect Accuracy',
    description:
      'Our AI precisely detects and removes backgrounds with incredible detail',
    icon: <Wand2 className="h-5 w-5" />,
  },
  {
    title: 'Lightning Fast',
    description: 'Process images in seconds, not minutes',
    icon: <Wand2 className="h-5 w-5" />,
  },
  {
    title: 'Batch Processing',
    description: 'Remove backgrounds from multiple images simultaneously',
    icon: <Wand2 className="h-5 w-5" />,
  },
];

export function Features() {
  return (
    <section id="products" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Advanced Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {feature.icon}
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}