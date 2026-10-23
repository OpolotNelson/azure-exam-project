import { HeroSection } from '@/components/landing/hero-section'
import {
  FinalCtaSection,
  HowItWorksSection,
  ValueSection,
} from '@/components/landing/landing-sections'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueSection />
      <HowItWorksSection />
      <FinalCtaSection />
    </>
  )
}
