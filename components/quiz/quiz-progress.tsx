interface QuizProgressProps {
  current: number
  total: number
  answered: number
  domainName: string
}

export function QuizProgress({ current, total, answered, domainName }: QuizProgressProps) {
  const percent = Math.round((answered / total) * 100)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-sm font-semibold uppercase tracking-wider text-primary">
            AZ-900 Practice Quiz
          </h1>
          <p className="mt-1 text-2xl font-bold tracking-tight text-navy" aria-live="polite">
            Question {current} of {total}
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
          {domainName}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
        aria-valuetext={`${answered} of ${total} questions answered`}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
