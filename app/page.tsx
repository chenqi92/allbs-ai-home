'use client';

import {Navigation} from '@/components/navigation';
import {Hero} from '@/components/hero';
import {Features} from '@/components/features';
import {Pricing} from '@/components/pricing';
import {FAQ} from '@/components/faq';
import {Footer} from '@/components/footer';
import Products from '@/components/products'

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation/>
            <Hero/>
            <Features/>
            <Products/>
            <Pricing/>
            <FAQ/>
            <Footer/>
        </div>
    );
}