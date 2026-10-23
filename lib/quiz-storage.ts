import { getQuestionById } from './questions'
import type { ActiveQuiz, OptionId, QuizAttempt, SubmittedAnswer } from './quiz-types'

export const ACTIVE_QUIZ_KEY = 'azurepath_active_quiz_v1'
export const ATTEMPTS_KEY = 'azurepath_attempts_v1'
const MAX_ATTEMPTS = 5

const OPTION_IDS: readonly OptionId[] = ['a', 'b', 'c', 'd']

// In-memory fallback for browsers where localStorage is blocked (e.g. some private modes).
const memoryStore = new Map<string, string>()

function readRaw(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return memoryStore.get(key) ?? null
  }
}

function writeRaw(key: string, value: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    memoryStore.set(key, value)
  }
}

function removeRaw(key: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
  memoryStore.delete(key)
}

function parseJson(raw: string | null): unknown {
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidAnswer(value: unknown): value is SubmittedAnswer {
  if (!isRecord(value)) return false
  const question =
    typeof value.questionId === 'string' ? getQuestionById(value.questionId) : undefined
  return (
    Boolean(question) &&
    OPTION_IDS.includes(value.selectedAnswerId as OptionId) &&
    typeof value.isCorrect === 'boolean' &&
    typeof value.answeredAt === 'number'
  )
}

function isValidQuestionIds(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((id) => typeof id === 'string' && Boolean(getQuestionById(id))) &&
    new Set(value).size === value.length
  )
}

function parseActiveQuiz(value: unknown): ActiveQuiz | null {
  if (!isRecord(value) || value.version !== 1) return null
  if (typeof value.sessionId !== 'string' || typeof value.startedAt !== 'number') return null
  if (!isValidQuestionIds(value.questionIds)) return null
  const questionIds = value.questionIds
  if (!isRecord(value.answers)) return null

  const answers: Record<string, SubmittedAnswer> = {}
  for (const [id, answer] of Object.entries(value.answers)) {
    if (questionIds.includes(id) && isValidAnswer(answer) && answer.questionId === id) {
      const question = getQuestionById(id)!
      // Recompute correctness from the trusted bank in case stored data was edited.
      answers[id] = { ...answer, isCorrect: answer.selectedAnswerId === question.correctAnswerId }
    }
  }

  const rawIndex = typeof value.currentIndex === 'number' ? Math.floor(value.currentIndex) : 0
  const currentIndex = Math.min(Math.max(rawIndex, 0), questionIds.length - 1)

  return {
    version: 1,
    sessionId: value.sessionId,
    questionIds,
    currentIndex,
    answers,
    startedAt: value.startedAt,
  }
}

function parseAttempt(value: unknown): QuizAttempt | null {
  if (!isRecord(value) || value.version !== 1) return null
  if (typeof value.sessionId !== 'string') return null
  if (!isValidQuestionIds(value.questionIds)) return null
  if (!Array.isArray(value.answers) || !value.answers.every(isValidAnswer)) return null
  if (
    typeof value.completedAt !== 'number' ||
    typeof value.correct !== 'number' ||
    typeof value.total !== 'number' ||
    typeof value.percentage !== 'number' ||
    !Array.isArray(value.domains)
  ) {
    return null
  }
  return value as unknown as QuizAttempt
}

export function loadActiveQuiz(): ActiveQuiz | null {
  const quiz = parseActiveQuiz(parseJson(readRaw(ACTIVE_QUIZ_KEY)))
  if (!quiz && readRaw(ACTIVE_QUIZ_KEY) !== null) removeRaw(ACTIVE_QUIZ_KEY)
  return quiz
}

export function saveActiveQuiz(quiz: ActiveQuiz): void {
  writeRaw(ACTIVE_QUIZ_KEY, JSON.stringify(quiz))
}

export function clearActiveQuiz(): void {
  removeRaw(ACTIVE_QUIZ_KEY)
}

export function loadAttempts(): QuizAttempt[] {
  const parsed = parseJson(readRaw(ATTEMPTS_KEY))
  if (!Array.isArray(parsed)) return []
  return parsed
    .map(parseAttempt)
    .filter((a): a is QuizAttempt => a !== null)
    .sort((a, b) => b.completedAt - a.completedAt)
}

export function loadLatestAttempt(): QuizAttempt | null {
  return loadAttempts()[0] ?? null
}

export function saveAttempt(attempt: QuizAttempt): void {
  const existing = loadAttempts().filter((a) => a.sessionId !== attempt.sessionId)
  writeRaw(ATTEMPTS_KEY, JSON.stringify([attempt, ...existing].slice(0, MAX_ATTEMPTS)))
}

export function recentlySeenQuestionIds(): Set<string> {
  const latest = loadLatestAttempt()
  return new Set(latest?.questionIds ?? [])
}
