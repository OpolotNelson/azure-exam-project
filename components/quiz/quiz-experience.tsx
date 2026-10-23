'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, FileBarChart, Loader2, RotateCcw } from 'lucide-react'
import { getQuestionById } from '@/lib/questions'
import { buildAttempt, createQuiz, isQuizComplete, submitAnswer } from '@/lib/quiz-engine'
import {
  clearActiveQuiz,
  loadActiveQuiz,
  recentlySeenQuestionIds,
  saveActiveQuiz,
  saveAttempt,
} from '@/lib/quiz-storage'
import type { ActiveQuiz, OptionId } from '@/lib/quiz-types'
import { cn } from '@/lib/utils'
import { QuizProgress } from './quiz-progress'
import { AnswerOption, type OptionState } from './answer-option'
import { AnswerFeedback } from './answer-feedback'
import { AiExplanation } from './ai-explanation'

export function QuizExperience() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<ActiveQuiz | null>(null)
  const [selection, setSelection] = useState<OptionId | null>(null)
  const [confirmingRestart, setConfirmingRestart] = useState(false)
  const [finishing, setFinishing] = useState(false)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let active = loadActiveQuiz()
    if (!active) {
      active = createQuiz(recentlySeenQuestionIds())
      saveActiveQuiz(active)
    }
    setQuiz(active)
  }, [])

  function update(next: ActiveQuiz) {
    setQuiz(next)
    saveActiveQuiz(next)
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground" role="status">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Preparing your quiz...
      </div>
    )
  }

  const questionId = quiz.questionIds[quiz.currentIndex]
  const question = getQuestionById(questionId)!
  const answer = quiz.answers[questionId]
  const isLast = quiz.currentIndex === quiz.questionIds.length - 1
  const answeredCount = Object.keys(quiz.answers).length
  const chosen = answer?.selectedAnswerId ?? selection

  function handleCheck() {
    if (!quiz || !selection || answer) return
    update(submitAnswer(quiz, questionId, selection))
    requestAnimationFrame(() => {
      feedbackRef.current?.focus({ preventScroll: true })
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  function handleNext() {
    if (!quiz || !answer) return
    if (isLast) {
      if (!isQuizComplete(quiz)) return
      setFinishing(true)
      saveAttempt(buildAttempt(quiz))
      clearActiveQuiz()
      router.push('/results')
      return
    }
    update({ ...quiz, currentIndex: quiz.currentIndex + 1 })
    setSelection(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    requestAnimationFrame(() => questionRef.current?.focus({ preventScroll: true }))
  }

  function handlePrevious() {
    if (!quiz || quiz.currentIndex === 0) return
    update({ ...quiz, currentIndex: quiz.currentIndex - 1 })
    setSelection(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    requestAnimationFrame(() => questionRef.current?.focus({ preventScroll: true }))
  }

  const previousButton =
    quiz.currentIndex > 0 ? (
      <button
        type="button"
        onClick={handlePrevious}
        disabled={finishing}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-base font-semibold text-navy transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-70 sm:w-auto"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Previous
      </button>
    ) : null

  function handleRestart() {
    if (!quiz) return
    const fresh = createQuiz(new Set(quiz.questionIds))
    update(fresh)
    setSelection(null)
    setConfirmingRestart(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function optionState(id: OptionId): OptionState {
    if (!answer) return chosen === id ? 'selected' : 'idle'
    if (id === question.correctAnswerId) return 'correct'
    if (id === answer.selectedAnswerId) return 'incorrect'
    return 'dimmed'
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 md:py-12">
      <QuizProgress
        current={quiz.currentIndex + 1}
        total={quiz.questionIds.length}
        answered={answeredCount}
        domainName={question.domainName}
      />

      <article
        key={question.id}
        className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm animate-in fade-in duration-300 sm:p-8"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
              {question.topic}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-1 capitalize text-muted-foreground">
              {question.difficulty}
            </span>
          </div>
          <h2
            ref={questionRef}
            tabIndex={-1}
            id="question-text"
            className="text-pretty text-xl font-semibold leading-snug text-navy outline-none sm:text-2xl"
          >
            {question.question}
          </h2>
        </div>

        <fieldset className="flex flex-col gap-3" aria-describedby="question-text">
          <legend className="sr-only">Choose one answer</legend>
          {question.options.map((option) => (
            <AnswerOption
              key={option.id}
              name={`q-${question.id}`}
              option={option}
              state={optionState(option.id)}
              checked={chosen === option.id}
              locked={Boolean(answer)}
              onSelect={() => setSelection(option.id)}
            />
          ))}
        </fieldset>

        {!answer && (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {previousButton}
            <p className="text-sm text-muted-foreground sm:ml-auto">
              {selection ? 'Ready? Check your answer.' : 'Select an answer to continue.'}
            </p>
            <button
              type="button"
              onClick={handleCheck}
              disabled={!selection}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              Check Answer
            </button>
          </div>
        )}

        {answer && (
          <div ref={feedbackRef} tabIndex={-1} className="flex flex-col gap-4 outline-none" aria-live="polite">
            <AnswerFeedback question={question} answer={answer} />
            <AiExplanation
              key={question.id}
              questionId={question.id}
              selectedAnswerId={answer.selectedAnswerId}
            />
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              {previousButton ?? <span className="hidden sm:block" aria-hidden="true" />}
              <button
                type="button"
                onClick={handleNext}
                disabled={finishing}
                className={cn(
                  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold text-white shadow-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-70 sm:w-auto',
                  isLast ? 'bg-navy shadow-navy/20 hover:bg-navy/90' : 'bg-primary shadow-primary/20 hover:bg-primary/90',
                )}
              >
                {finishing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Building your report...
                  </>
                ) : isLast ? (
                  <>
                    <FileBarChart className="size-4" aria-hidden="true" />
                    View My Learning Report
                  </>
                ) : (
                  <>
                    Next Question
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </article>

      <div className="flex flex-col items-center gap-3 text-sm">
        {confirmingRestart ? (
          <div
            role="alertdialog"
            aria-labelledby="restart-title"
            className="flex w-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <p id="restart-title" className="text-navy">
              Restart with a new set of questions? Your current progress will be lost.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmingRestart(false)}
                className="h-9 rounded-lg border border-border px-3 font-medium text-navy hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRestart}
                autoFocus
                className="h-9 rounded-lg bg-error px-3 font-medium text-white hover:bg-error/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Yes, restart
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingRestart(true)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-muted-foreground transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Restart Quiz
          </button>
        )}
      </div>
    </div>
  )
}
