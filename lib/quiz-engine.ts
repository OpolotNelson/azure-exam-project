import { DOMAIN_ORDER, DOMAINS, QUESTIONS, getQuestionById } from './questions'
import type {
  ActiveQuiz,
  DomainResult,
  OptionId,
  QuizAttempt,
  SubmittedAnswer,
  TopicResult,
  TopicStatus,
} from './quiz-types'

export const QUESTIONS_PER_QUIZ = DOMAIN_ORDER.reduce(
  (sum, id) => sum + DOMAINS[id].questionsPerQuiz,
  0,
)

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function createSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Picks a balanced set per domain, preferring questions the learner has not
 * seen recently so retakes surface fresh content where the bank allows.
 */
export function selectQuestionIds(recentlySeen: Set<string> = new Set()): string[] {
  const selected: string[] = []
  for (const domainId of DOMAIN_ORDER) {
    const pool = QUESTIONS.filter((q) => q.domainId === domainId)
    const fresh = shuffle(pool.filter((q) => !recentlySeen.has(q.id)))
    const seen = shuffle(pool.filter((q) => recentlySeen.has(q.id)))
    const picks = [...fresh, ...seen].slice(0, DOMAINS[domainId].questionsPerQuiz)
    selected.push(...picks.map((q) => q.id))
  }
  return shuffle(selected)
}

export function createQuiz(recentlySeen?: Set<string>): ActiveQuiz {
  return {
    version: 1,
    sessionId: createSessionId(),
    questionIds: selectQuestionIds(recentlySeen),
    currentIndex: 0,
    answers: {},
    startedAt: Date.now(),
  }
}

export function submitAnswer(
  quiz: ActiveQuiz,
  questionId: string,
  selectedAnswerId: OptionId,
): ActiveQuiz {
  if (quiz.answers[questionId]) return quiz
  const question = getQuestionById(questionId)
  if (!question) return quiz
  const answer: SubmittedAnswer = {
    questionId,
    selectedAnswerId,
    isCorrect: question.correctAnswerId === selectedAnswerId,
    answeredAt: Date.now(),
  }
  return { ...quiz, answers: { ...quiz.answers, [questionId]: answer } }
}

export function isQuizComplete(quiz: ActiveQuiz): boolean {
  return quiz.questionIds.every((id) => Boolean(quiz.answers[id]))
}

export function toPercentage(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100)
}

export function calculateDomainResults(answers: SubmittedAnswer[]): DomainResult[] {
  return DOMAIN_ORDER.map((domainId) => {
    const inDomain = answers.filter(
      (a) => getQuestionById(a.questionId)?.domainId === domainId,
    )
    const correct = inDomain.filter((a) => a.isCorrect).length
    return {
      domainId,
      correct,
      total: inDomain.length,
      percentage: inDomain.length === 0 ? null : toPercentage(correct, inDomain.length),
    }
  })
}

export function buildAttempt(quiz: ActiveQuiz): QuizAttempt {
  const answers = quiz.questionIds
    .map((id) => quiz.answers[id])
    .filter((a): a is SubmittedAnswer => Boolean(a))
  const correct = answers.filter((a) => a.isCorrect).length
  return {
    version: 1,
    sessionId: quiz.sessionId,
    questionIds: quiz.questionIds,
    answers,
    startedAt: quiz.startedAt,
    completedAt: Date.now(),
    correct,
    total: answers.length,
    percentage: toPercentage(correct, answers.length),
    domains: calculateDomainResults(answers),
  }
}

function topicStatus(correct: number, total: number): TopicStatus {
  if (correct === total) return 'strong'
  if (correct === 0) return 'needs-practice'
  return 'worth-revisiting'
}

export function analyseTopics(attempt: QuizAttempt): TopicResult[] {
  const byTopic = new Map<string, TopicResult>()
  for (const answer of attempt.answers) {
    const question = getQuestionById(answer.questionId)
    if (!question) continue
    const existing = byTopic.get(question.topic) ?? {
      topic: question.topic,
      domainId: question.domainId,
      correct: 0,
      total: 0,
      status: 'strong' as TopicStatus,
      learnMoreUrl: question.learnMoreUrl,
      missedQuestionIds: [],
    }
    existing.total += 1
    if (answer.isCorrect) existing.correct += 1
    else existing.missedQuestionIds.push(question.id)
    byTopic.set(question.topic, existing)
  }
  return [...byTopic.values()].map((t) => ({ ...t, status: topicStatus(t.correct, t.total) }))
}

export type PerformanceBand = 'high' | 'mid' | 'low'

export function performanceBand(percentage: number): PerformanceBand {
  if (percentage >= 80) return 'high'
  if (percentage >= 50) return 'mid'
  return 'low'
}

export function domainDescriptor(percentage: number | null): string {
  if (percentage === null) return 'Not yet assessed'
  if (percentage >= 80) return 'Strong on this attempt'
  if (percentage >= 50) return 'Worth revisiting'
  return 'Needs more practice'
}
