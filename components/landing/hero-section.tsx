import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles, XCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ResumeBanner } from './resume-banner'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_30%_30%,rgba(37,99,235,0.14),transparent_70%),radial-gradient(40%_50%_at_80%_20%,rgba(6,182,212,0.14),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            AI-Powered AZ-900 Preparation
          </span>
          <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Learn from every mistake.{' '}
            <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">
              Get Azure-ready.
            </span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Practice Microsoft Azure Fundamentals with smart quizzes, instant explanations and
            personalized feedback that helps you understand what to study next.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/quiz"
              className={cn(
                buttonVariants(),
                'h-12 gap-2 px-6 text-base shadow-lg shadow-primary/25 hover:bg-primary/90',
              )}
            >
              Start Learning
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="#how-it-works"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-12 px-6 text-base')}
            >
              How It Works
            </a>
          </div>
          <ResumeBanner />
        </div>

        <ProductPreview />
      </div>
    </section>
  )
}

function ProductPreview() {
  return (
    <figure className="relative mx-auto w-full max-w-lg" aria-label="Preview of an AzurePath  practice question with feedback">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-cyan/10 to-transparent blur-2xl"
      />
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-navy/5 sm:p-6" aria-hidden="true">
        <div className="mb-4 flex items-center justify-between text-xs">
          <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
            Cloud Concepts
          </span>
          <span className="font-medium text-muted-foreground">Question 4 of 10</span>
        </div>
        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[40%] rounded-full bg-primary" />
        </div>
        <p className="mb-4 text-pretty font-semibold leading-snug text-navy">
          A mobile money app gets a traffic spike at month end. Resources are added automatically,
          then removed. Which concept is this?
        </p>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5 text-muted-foreground">
            Reliability
          </li>
          <li className="flex items-center justify-between rounded-xl border-2 border-success bg-success/5 px-3.5 py-2.5 font-medium text-navy">
            Elasticity
            <CheckCircle2 className="size-4 text-success" />
          </li>
          <li className="flex items-center justify-between rounded-xl border-2 border-error bg-error/5 px-3.5 py-2.5 font-medium text-navy">
            Predictability
            <XCircle className="size-4 text-error" />
          </li>
        </ul>
        <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-sm">
          <p className="font-semibold text-navy">{"Not quite — let's understand this."}</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">
            Elasticity automatically adds and removes resources as demand changes.
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -right-2 hidden w-64 rounded-2xl border border-cyan/30 bg-card p-4 shadow-lg sm:block"
      >
        <p className="flex items-center gap-1.5 text-xs font-semibold text-accent-foreground">
          <Sparkles className="size-3.5" />
          Explained simply
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {"Like a boda boda stage adding riders at rush hour and sending them home when it's quiet."}
        </p>
      </div>
      <figcaption className="sr-only">
        Sample question showing a highlighted correct answer, a learner&apos;s incorrect choice, and
        a supportive explanation.
      </figcaption>
    </figure>
  )
}
