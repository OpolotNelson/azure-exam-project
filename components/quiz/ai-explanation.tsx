'use client'

import { useRef, useState } from 'react'
import { AlertCircle, Globe2, Lightbulb, Loader2, RotateCcw, Sparkles } from 'lucide-react'
import type { AiExplanation as AiExplanationData, OptionId } from '@/lib/quiz-types'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: AiExplanationData }
  | { kind: 'error'; message: string; retryable: boolean }

interface AiExplanationProps {
  questionId: string
  selectedAnswerId: OptionId
}

function isExplanation(value: unknown): value is AiExplanationData {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.simpleExplanation === 'string' &&
    typeof v.realWorldExample === 'string' &&
    typeof v.memoryTip === 'string' &&
    v.simpleExplanation.length > 0
  )
}

export function AiExplanation({ questionId, selectedAnswerId }: AiExplanationProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const inFlight = useRef(false)

  async function requestExplanation() {
    if (inFlight.current) return
    inFlight.current = true
    setStatus({ kind: 'loading' })
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 25_000)
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedAnswerId }),
        signal: controller.signal,
      })
      const json: unknown = await res.json().catch(() => null)
      const payload = (json ?? {}) as { explanation?: unknown; error?: { message?: string; code?: string } }
      if (res.ok && isExplanation(payload.explanation)) {
        setStatus({ kind: 'success', data: payload.explanation })
      } else {
        setStatus({
          kind: 'error',
          message:
            payload.error?.message ??
            'AI assistance is currently unavailable. The explanation above still covers this concept.',
          retryable: payload.error?.code !== 'UNKNOWN_QUESTION',
        })
      }
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'AbortError'
      setStatus({
        kind: 'error',
        message: timedOut
          ? 'This is taking longer than expected — your connection may be slow.'
          : 'We could not reach the AI explainer. Check your connection and try again.',
        retryable: true,
      })
    } finally {
      clearTimeout(timer)
      inFlight.current = false
    }
  }

  if (status.kind === 'idle') {
    return (
      <button
        type="button"
        onClick={requestExplanation}
        className="group inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-cyan/40 bg-accent px-4 text-sm font-semibold text-accent-foreground transition-all hover:border-cyan hover:shadow-md hover:shadow-cyan/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Sparkles className="size-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
        Explain it simply ✨
      </button>
    )
  }

  return (
    <section
      aria-label="AI explanation"
      aria-live="polite"
      aria-busy={status.kind === 'loading'}
      className="overflow-hidden rounded-2xl border border-cyan/30 bg-card shadow-sm animate-in fade-in duration-300"
    >
      <header className="flex items-center gap-2 border-b border-cyan/20 bg-gradient-to-r from-accent to-secondary/60 px-5 py-3">
        <Sparkles className="size-4 text-accent-foreground" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-navy">AI Study Buddy</h3>
        <span className="ml-auto rounded-full bg-card/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          AI-generated
        </span>
      </header>

      {status.kind === 'loading' && (
        <div className="flex items-center gap-3 px-5 py-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-accent-foreground" aria-hidden="true" />
          Making this concept easier to understand...
        </div>
      )}

      {status.kind === 'error' && (
        <div className="flex flex-col gap-3 px-5 py-5">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-navy" role="alert">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
            {status.message}
          </p>
          {status.retryable && (
            <button
              type="button"
              onClick={requestExplanation}
              className="inline-flex h-9 items-center gap-2 self-start rounded-lg border border-border bg-card px-3 text-sm font-medium text-navy transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Try again
            </button>
          )}
        </div>
      )}

      {status.kind === 'success' && (
        <dl className="flex flex-col divide-y divide-border">
          <div className="px-5 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-primary">In simple terms</dt>
            <dd className="mt-1.5 text-pretty break-words leading-relaxed text-navy">
              {status.data.simpleExplanation}
            </dd>
          </div>
          <div className="px-5 py-4">
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <Globe2 className="size-3.5" aria-hidden="true" />
              Real-world example
            </dt>
            <dd className="mt-1.5 text-pretty break-words leading-relaxed text-navy">
              {status.data.realWorldExample}
            </dd>
          </div>
          <div className="bg-warning/[0.07] px-5 py-4">
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Lightbulb className="size-3.5" aria-hidden="true" />
              Memory tip
            </dt>
            <dd className="mt-1.5 text-pretty break-words font-medium leading-relaxed text-navy">
              {status.data.memoryTip}
            </dd>
          </div>
        </dl>
      )}
    </section>
  )
}
