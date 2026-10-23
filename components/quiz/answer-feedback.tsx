import { CheckCircle2, ExternalLink, Lightbulb, Info } from 'lucide-react'
import type { Question, SubmittedAnswer } from '@/lib/quiz-types'
import { cn } from '@/lib/utils'

interface AnswerFeedbackProps {
  question: Question
  answer: SubmittedAnswer
}

export function AnswerFeedback({ question, answer }: AnswerFeedbackProps) {
  const correctOption = question.options.find((o) => o.id === question.correctAnswerId)!
  const selectedOption = question.options.find((o) => o.id === answer.selectedAnswerId)!
  const otherWrong = question.options.filter(
    (o) => o.id !== question.correctAnswerId && o.id !== answer.selectedAnswerId,
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border p-5 animate-in fade-in slide-in-from-bottom-2 duration-300',
        answer.isCorrect ? 'border-success/30 bg-success/[0.05]' : 'border-warning/40 bg-warning/[0.08]',
      )}
    >
      <div className="flex items-start gap-3">
        {answer.isCorrect ? (
          <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-success" aria-hidden="true" />
        ) : (
          <Info className="mt-0.5 size-6 shrink-0 text-warning" aria-hidden="true" />
        )}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-navy">
            {answer.isCorrect ? "Correct! You've got it." : "Not quite — let's understand this."}
          </p>
          {!answer.isCorrect && (
            <p className="text-sm text-muted-foreground">
              The correct answer is{' '}
              <strong className="font-semibold text-navy">
                {correctOption.id.toUpperCase()}. {correctOption.text}
              </strong>
            </p>
          )}
        </div>
      </div>

      <p className="text-pretty leading-relaxed text-navy">{question.explanation}</p>

      {!answer.isCorrect && (
        <div className="rounded-xl border border-error/20 bg-card p-4">
          <p className="text-sm font-semibold text-error">
            Why &ldquo;{selectedOption.text}&rdquo; isn&apos;t right
          </p>
          <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
            {question.optionExplanations[selectedOption.id]}
          </p>
        </div>
      )}

      <details className="group rounded-xl border border-border bg-card">
        <summary className="cursor-pointer list-none rounded-xl px-4 py-3 text-sm font-medium text-navy marker:hidden hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Show why the other options are wrong</span>
          <span className="hidden group-open:inline">Hide the other options</span>
        </summary>
        <ul className="flex flex-col gap-3 border-t border-border px-4 py-3">
          {otherWrong.map((o) => (
            <li key={o.id} className="text-sm leading-relaxed">
              <span className="font-semibold text-navy">
                {o.id.toUpperCase()}. {o.text}
              </span>
              <span className="block text-muted-foreground">{question.optionExplanations[o.id]}</span>
            </li>
          ))}
        </ul>
      </details>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="flex items-start gap-2 text-sm leading-relaxed text-navy">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <span>
            <span className="font-semibold">Learning tip: </span>
            {question.learningTip}
          </span>
        </p>
        <a
          href={question.learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Learn more
          <ExternalLink className="size-3.5" aria-hidden="true" />
          <span className="sr-only">about {question.topic} on Microsoft Learn (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
