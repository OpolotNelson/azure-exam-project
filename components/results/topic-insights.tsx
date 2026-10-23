import { CheckCircle2, Crosshair } from 'lucide-react'
import { DOMAINS } from '@/lib/questions'
import { sortWeakestFirst } from '@/lib/learning-recommendations'
import type { TopicResult } from '@/lib/quiz-types'

const STATUS_LABEL: Record<TopicResult['status'], string> = {
  strong: 'Strong on this attempt',
  'worth-revisiting': 'Worth revisiting',
  'needs-practice': 'Needs more practice',
}

function TopicRow({ topic }: { topic: TopicResult }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-navy">{topic.topic}</p>
        <p className="text-xs text-muted-foreground">
          {DOMAINS[topic.domainId].shortName} · {topic.correct}/{topic.total} correct
        </p>
      </div>
      <span className="shrink-0 text-right text-xs font-semibold text-muted-foreground">
        {STATUS_LABEL[topic.status]}
      </span>
    </li>
  )
}

export function TopicInsights({ topics }: { topics: TopicResult[] }) {
  const strengths = topics
    .filter((t) => t.status === 'strong')
    .sort((a, b) => b.total - a.total)
  const focus = sortWeakestFirst(topics.filter((t) => t.status !== 'strong'))

  return (
    <section aria-label="Strengths and focus areas" className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
          Your Strengths
        </h2>
        {strengths.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {strengths.map((t) => (
              <TopicRow key={t.topic} topic={t} />
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            No topics were fully answered correctly this time. That&apos;s okay — every topic below is
            a chance to build a solid strength.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          <Crosshair className="size-5 text-warning" aria-hidden="true" />
          Focus Areas
        </h2>
        {focus.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {focus.map((t) => (
              <TopicRow key={t.topic} topic={t} />
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            You answered every topic correctly in this session. Try another quiz to test topics you
            haven&apos;t seen yet.
          </p>
        )}
      </div>
      <p className="text-xs text-muted-foreground md:col-span-2">
        Labels reflect this session only. Topics tested by a single question are signals to explore,
        not definitive measures of mastery.
      </p>
    </section>
  )
}
