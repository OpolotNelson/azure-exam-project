import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuestionOption } from '@/lib/quiz-types'

export type OptionState = 'idle' | 'selected' | 'correct' | 'incorrect' | 'dimmed'

interface AnswerOptionProps {
  name: string
  option: QuestionOption
  state: OptionState
  checked: boolean
  locked: boolean
  onSelect: () => void
}

const STATE_STYLES: Record<OptionState, string> = {
  idle: 'border-border bg-card hover:border-primary/50 hover:bg-secondary/50',
  selected: 'border-primary bg-secondary ring-2 ring-primary/20',
  correct: 'border-success bg-success/[0.06]',
  incorrect: 'border-error bg-error/[0.06]',
  dimmed: 'border-border bg-card opacity-60',
}

const BADGE_STYLES: Record<OptionState, string> = {
  idle: 'border-border bg-muted text-muted-foreground',
  selected: 'border-primary bg-primary text-primary-foreground',
  correct: 'border-success bg-success text-white',
  incorrect: 'border-error bg-error text-white',
  dimmed: 'border-border bg-muted text-muted-foreground',
}

export function AnswerOption({ name, option, state, checked, locked, onSelect }: AnswerOptionProps) {
  const inputId = `${name}-${option.id}`
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group relative flex min-h-14 items-center gap-3.5 rounded-xl border-2 px-4 py-3.5 text-left transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring',
        locked ? 'cursor-default' : 'cursor-pointer',
        STATE_STYLES[state],
      )}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={option.id}
        checked={checked}
        disabled={locked}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold uppercase transition-colors',
          BADGE_STYLES[state],
        )}
      >
        {option.id}
      </span>
      <span className="flex-1 text-pretty font-medium leading-snug text-navy">{option.text}</span>
      {state === 'correct' && (
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-success">
          <CheckCircle2 className="size-5" aria-hidden="true" />
          <span className="hidden sm:inline">Correct answer</span>
          <span className="sr-only sm:hidden">Correct answer</span>
        </span>
      )}
      {state === 'incorrect' && (
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-error">
          <XCircle className="size-5" aria-hidden="true" />
          <span className="hidden sm:inline">Your answer</span>
          <span className="sr-only sm:hidden">Your answer, incorrect</span>
        </span>
      )}
    </label>
  )
}
