import { DOMAINS, getQuestionById } from './questions'
import type { TopicResult } from './quiz-types'

export interface Recommendation {
  topic: string
  domainName: string
  priority: 'high' | 'medium'
  reason: string
  action: string
  learnMoreUrl: string
}

const STATUS_PRIORITY: Record<TopicResult['status'], number> = {
  'needs-practice': 0,
  'worth-revisiting': 1,
  strong: 2,
}

export function sortWeakestFirst(topics: TopicResult[]): TopicResult[] {
  return [...topics].sort(
    (a, b) =>
      STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status] ||
      a.correct / a.total - b.correct / b.total ||
      b.total - a.total,
  )
}

/**
 * Transparent rules: every topic with at least one missed question becomes a
 * recommendation. Topics where every attempt was missed are high priority.
 */
export function buildRecommendations(topics: TopicResult[]): Recommendation[] {
  return sortWeakestFirst(topics)
    .filter((t) => t.missedQuestionIds.length > 0)
    .map((t) => {
      const missed = t.missedQuestionIds
        .map(getQuestionById)
        .filter((q): q is NonNullable<typeof q> => Boolean(q))
      const firstMissed = missed[0]
      const missedCount = t.total - t.correct
      const reason =
        t.total === 1
          ? `You missed the question on ${t.topic} in this session.`
          : `You missed ${missedCount} of ${t.total} questions on ${t.topic} in this session.`
      return {
        topic: t.topic,
        domainName: DOMAINS[t.domainId].shortName,
        priority: t.status === 'needs-practice' ? 'high' : 'medium',
        reason,
        action: firstMissed
          ? `Revisit this concept on Microsoft Learn. Key idea to lock in: ${firstMissed.learningTip}`
          : 'Revisit this concept on Microsoft Learn.',
        learnMoreUrl: t.learnMoreUrl,
      }
    })
}
