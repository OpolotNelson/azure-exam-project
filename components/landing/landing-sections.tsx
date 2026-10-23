import Link from 'next/link'
import { ArrowRight, Brain, Sparkles, Target, type LucideIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "Learn, Don't Memorize",
    description: 'Understand why an answer is right or wrong with clear explanations.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Clarity',
    description: 'Get difficult Azure concepts explained in simple, relatable language.',
  },
  {
    icon: Target,
    title: 'Know What to Improve',
    description: 'Discover your weak areas and focus on what matters most.',
  },
]

const STEPS = [
  {
    title: 'Take a Quiz',
    description: '10 balanced questions across all three AZ-900 domains, one at a time.',
  },
  {
    title: 'Understand Your Answers',
    description: 'Instant feedback on every choice, plus a simple AI explanation when you need it.',
  },
  {
    title: 'Improve Your Weak Areas',
    description: 'A personal report shows where you stand and exactly what to revise next.',
  },
]

export function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
    </article>
  )
}

export function ValueSection() {
  return (
    <section aria-labelledby="value-heading" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h2 id="value-heading" className="sr-only">
        Why AzurePath 
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
    >
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
        <h2 id="how-heading" className="mt-2 text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Every mistake becomes a learning opportunity
        </h2>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-navy font-mono text-sm font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(37,99,235,0.45),transparent_70%)]"
        />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to discover what you know?
          </h2>
          <p className="max-w-lg text-pretty text-slate-300">
            {"Don't just practice. Understand. Improve. Get Azure-ready."}
          </p>
          <Link
            href="/quiz"
            className={cn(buttonVariants(), 'h-12 gap-2 px-6 text-base hover:bg-primary/90')}
          >
            Start Your AZ-900 Quiz
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
