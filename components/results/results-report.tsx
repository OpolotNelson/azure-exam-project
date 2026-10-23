'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClipboardList, Loader2, RotateCcw } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { analyseTopics, createQuiz } from '@/lib/quiz-engine'
import { buildRecommendations } from '@/lib/learning-recommendations'
import { loadLatestAttempt, saveActiveQuiz } from '@/lib/quiz-storage'
import type { QuizAttempt } from '@/lib/quiz-types'
import { cn } from '@/lib/utils'
import { ResultSummary } from './result-summary'
import { DomainPerformance } from './domain-performance'
import { TopicInsights } from './topic-insights'
import { RevisionRecommendations } from './revision-recommendations'
import { AnswerReview } from './answer-review'

type LoadState = { status: 'loading' } | { status: 'empty' } | { status: 'ready'; attempt: QuizAttempt }

export function ResultsReport() {
  const router = useRouter()
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [showReview, setShowReview] = useState(false)
  const reviewRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const attempt = loadLatestAttempt()
    setState(attempt ? { status: 'ready', attempt } : { status: 'empty' })
  }, [])

  const attempt = state.status === 'ready' ? state.attempt : null
  const topics = useMemo(() => (attempt ? analyseTopics(attempt) : []), [attempt])
  const recommendations = useMemo(() => buildRecommendations(topics), [topics])

  function practiceAgain() {
    saveActiveQuiz(createQuiz(new Set(attempt?.questionIds ?? [])))
    router.push('/quiz')
  }

  function toggleReview() {
    setShowReview((open) => {
      if (!open) {
        requestAnimationFrame(() => reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      }
      return !open
    })
  }

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground" role="status">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Loading your learning report...
      </div>
    )
  }

  if (state.status === 'empty' || !attempt) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <ClipboardList className="size-7" aria-hidden="true" />
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-navy">No learning report yet</h1>
        <p className="text-pretty text-muted-foreground">
          Complete a 10-question practice quiz and we&apos;ll show you what you understand, where you
          can improve and what to study next.
        </p>
        <Link href="/quiz" className={cn(buttonVariants(), 'h-12 px-6 text-base hover:bg-primary/90')}>
          Start Quiz
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6 md:py-12">
      <ResultSummary attempt={attempt} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={practiceAgain}
          className={cn(buttonVariants(), 'h-12 gap-2 px-6 text-base hover:bg-primary/90')}
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Practice Again
        </button>
        <button
          type="button"
          onClick={toggleReview}
          aria-expanded={showReview}
          aria-controls="answer-review"
          className={cn(buttonVariants({ variant: 'outline' }), 'h-12 gap-2 px-6 text-base')}
        >
          <ClipboardList className="size-4" aria-hidden="true" />
          {showReview ? 'Hide My Answers' : 'Review My Answers'}
        </button>
      </div>

      <DomainPerformance domains={attempt.domains} />
      <TopicInsights topics={topics} />
      <RevisionRecommendations recommendations={recommendations} />

      <section
        id="answer-review"
        ref={reviewRef}
        aria-labelledby="review-heading"
        hidden={!showReview}
        className="scroll-mt-24 flex-col gap-4 [&:not([hidden])]:flex"
      >
        <h2 id="review-heading" className="text-xl font-bold tracking-tight text-navy">
          Review my answers
        </h2>
        <AnswerReview answers={attempt.answers} />
      </section>
    </div>
  )
}
