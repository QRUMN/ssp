import React from 'react';
import { BentoSection } from '../components/landing/BentoSection';
import { HeroSection } from '../components/landing/HeroSection';
import { TribeFeed } from '../components/landing/TribeFeed';
import { EventsShowcase } from '../components/landing/EventsShowcase';
import { MembershipTiers } from '../components/landing/MembershipTiers';
import { PhotoGallery } from '../components/landing/PhotoGallery';
import { CommunityHighlight } from '../components/landing/CommunityHighlight';
import { MerchShowcase } from '../components/landing/MerchShowcase';

export function Landing() {
  return (
    <div className="min-h-screen space-y-8">
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <BentoSection className="overflow-hidden p-0">
          <HeroSection />
        </BentoSection>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BentoSection className="md:col-span-2">
          <EventsShowcase />
        </BentoSection>

        <BentoSection>
          <CommunityHighlight />
        </BentoSection>

        <BentoSection className="lg:col-span-3">
          <TribeFeed />
        </BentoSection>

        <BentoSection className="lg:col-span-2">
          <MembershipTiers />
        </BentoSection>

        <BentoSection>
          <MerchShowcase />
        </BentoSection>
      </div>
    </div>
  );
}