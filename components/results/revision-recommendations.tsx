import { BookOpen, ExternalLink, PartyPopper } from 'lucide-react'
import type { Recommendation } from '@/lib/learning-recommendations'
import { cn } from '@/lib/utils'

export function RevisionRecommendations({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <section aria-labelledby="next-heading" className="flex flex-col gap-4">
      <div>
        <h2 id="next-heading" className="text-xl font-bold tracking-tight text-navy">
          What Should You Study Next?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Built from the questions you missed, weakest topics first.
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success/[0.05] p-5">
          <PartyPopper className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
          <p className="leading-relaxed text-navy">
            No missed topics this session. Practice again to meet new questions from the bank and
            keep strengthening your foundations.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {recommendations.slice(0, 5).map((rec, i) => (
            <li
              key={rec.topic}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-navy">Review {rec.topic}</h3>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      rec.priority === 'high'
                        ? 'bg-warning/15 text-amber-700'
                        : 'bg-secondary text-secondary-foreground',
                    )}
                  >
                    {rec.priority === 'high' ? 'High priority' : 'Worth revisiting'}
                  </span>
                  <span className="text-xs text-muted-foreground">{rec.domainName}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{rec.reason}</p>
                <p className="text-pretty text-sm leading-relaxed text-navy">{rec.action}</p>
                <a
                  href={rec.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <BookOpen className="size-4" aria-hidden="true" />
                  Study on Microsoft Learn
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ol>
      )}
      {recommendations.length > 5 && (
        <p className="text-sm text-muted-foreground">
          Start with these five. {recommendations.length - 5} more topic
          {recommendations.length - 5 === 1 ? '' : 's'} to revisit are listed under Focus Areas and in
          your answer review.
        </p>
      )}
    </section>
  )
}
