'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const faqCategories = [
  { value: 'general', label: 'faq.categories.general' },
  { value: 'technical', label: 'faq.categories.technical' },
  { value: 'pricing', label: 'faq.categories.pricing' },
  { value: 'support', label: 'faq.categories.support' },
];

const faqItems = [
  {
    category: 'general',
    items: ['what_is', 'how_accurate'],
  },
  {
    category: 'technical',
    items: ['supported_formats'],
  },
  {
    category: 'pricing',
    items: ['refund_policy'],
  },
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          faq.title
        </h2>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Input
            type="text"
            placeholder="faq.search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Categories */}
        <Tabs
          defaultValue="general"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="max-w-3xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* FAQ Items */}
          <AnimatePresence mode="wait">
            {faqCategories.map((category) => (
              <TabsContent
                key={category.value}
                value={category.value}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Accordion type="single" collapsible>
                    {faqItems
                      .find((item) => item.category === category.value)
                      ?.items.map((questionKey) => (
                        <AccordionItem key={questionKey} value={questionKey}>
                          <AccordionTrigger>
                            {`faq.questions.${questionKey}.question`}
                          </AccordionTrigger>
                          <AccordionContent>
                            {`faq.questions.${questionKey}.answer`}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}