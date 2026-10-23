'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileBarChart, PlayCircle } from 'lucide-react'
import { loadActiveQuiz, loadLatestAttempt } from '@/lib/quiz-storage'

interface StoredProgress {
  activeAnswered: number | null
  activeTotal: number
  hasReport: boolean
}

export function ResumeBanner() {
  const [progress, setProgress] = useState<StoredProgress | null>(null)

  useEffect(() => {
    const active = loadActiveQuiz()
    setProgress({
      activeAnswered: active ? Object.keys(active.answers).length : null,
      activeTotal: active?.questionIds.length ?? 0,
      hasReport: loadLatestAttempt() !== null,
    })
  }, [])

  if (!progress || (progress.activeAnswered === null && !progress.hasReport)) return null

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:max-w-xl" role="status">
      {progress.activeAnswered !== null && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-navy">Welcome back! Continue where you stopped.</p>
            <p className="text-sm text-muted-foreground">
              {progress.activeAnswered} of {progress.activeTotal} questions answered
            </p>
          </div>
          <Link
            href="/quiz"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-navy px-4 text-sm font-medium text-white transition-colors hover:bg-navy/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <PlayCircle className="size-4" aria-hidden="true" />
            Continue Quiz
          </Link>
        </div>
      )}
      {progress.hasReport && (
        <Link
          href="/results"
          className="inline-flex items-center gap-2 self-start rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <FileBarChart className="size-4" aria-hidden="true" />
          View your last learning report
        </Link>
      )}
    </div>
  )
}
