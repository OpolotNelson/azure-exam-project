import { performanceBand } from '@/lib/quiz-engine'
import type { QuizAttempt } from '@/lib/quiz-types'

const MESSAGES = {
  high: {
    text: 'Strong performance! Keep building your understanding.',
    indicator: 'Building strong foundations',
    color: '#16A34A',
  },
  mid: {
    text: 'Good progress. A few concepts need more attention.',
    indicator: 'Making good progress',
    color: '#2563EB',
  },
  low: {
    text: "Every attempt is a learning opportunity. Here's where to focus next.",
    indicator: 'Early in the journey',
    color: '#F59E0B',
  },
} as const

export function ResultSummary({ attempt }: { attempt: QuizAttempt }) {
  const band = MESSAGES[performanceBand(attempt.percentage)]
  const completed = new Date(attempt.completedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <section
      aria-labelledby="report-heading"
      className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 md:grid-cols-[auto_1fr]"
    >
      <div
        className="relative mx-auto flex size-44 items-center justify-center rounded-full sm:size-52"
        style={{
          background: `conic-gradient(${band.color} ${attempt.percentage * 3.6}deg, #E2E8F0 0deg)`,
        }}
        role="img"
        aria-label={`Score: ${attempt.correct} out of ${attempt.total}, ${attempt.percentage} percent correct`}
      >
        <div className="flex size-[calc(100%-22px)] flex-col items-center justify-center rounded-full bg-card">
          <span className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {attempt.correct}
            <span className="text-2xl font-semibold text-muted-foreground sm:text-3xl"> / {attempt.total}</span>
          </span>
          <span className="mt-1 text-sm font-medium text-muted-foreground">
            {attempt.percentage}% correct
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-center md:text-left">
        <div>
          <h1 id="report-heading" className="text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Your Learning Report
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            {"Here's what you understand and where you can improve."}
          </p>
        </div>
        <p className="text-pretty text-lg font-medium text-navy">{band.text}</p>
        <div className="flex flex-col gap-1 rounded-xl bg-muted/70 p-4 text-left text-sm">
          <p className="text-navy">
            <span className="font-semibold">Current practice performance: {attempt.percentage}%</span>
            {' · '}
            <span style={{ color: band.color }} className="font-semibold">
              {band.indicator}
            </span>
          </p>
          <p className="text-muted-foreground">
            Estimate based only on this {attempt.total}-question practice session ({completed}). It is
            not a prediction of your official AZ-900 exam result.
          </p>
        </div>
      </div>
    </section>
  )
}
