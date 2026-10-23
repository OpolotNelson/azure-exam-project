import { Boxes, Cloud, ShieldCheck, type LucideIcon } from 'lucide-react'
import { DOMAINS } from '@/lib/questions'
import { domainDescriptor } from '@/lib/quiz-engine'
import type { DomainId, DomainResult } from '@/lib/quiz-types'
import { cn } from '@/lib/utils'

const ICONS: Record<DomainId, LucideIcon> = {
  'cloud-concepts': Cloud,
  'architecture-services': Boxes,
  'management-governance': ShieldCheck,
}

function barColor(pct: number | null) {
  if (pct === null) return 'bg-muted'
  if (pct >= 80) return 'bg-success'
  if (pct >= 50) return 'bg-primary'
  return 'bg-warning'
}

function descriptorColor(pct: number | null) {
  if (pct === null) return 'bg-muted text-muted-foreground'
  if (pct >= 80) return 'bg-success/10 text-green-700'
  if (pct >= 50) return 'bg-secondary text-secondary-foreground'
  return 'bg-warning/15 text-amber-700'
}

export function DomainPerformance({ domains }: { domains: DomainResult[] }) {
  return (
    <section aria-labelledby="domains-heading" className="flex flex-col gap-4">
      <h2 id="domains-heading" className="text-xl font-bold tracking-tight text-navy">
        Performance by domain
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {domains.map((d) => {
          const info = DOMAINS[d.domainId]
          const Icon = ICONS[d.domainId]
          return (
            <article key={d.domainId} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold leading-snug text-navy">{info.shortName}</h3>
                  <p className="text-xs text-muted-foreground">Exam weighting {info.weighting}</p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold tracking-tight text-navy">
                  {d.percentage === null ? '—' : `${d.percentage}%`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {d.total === 0 ? 'No questions answered' : `${d.correct} of ${d.total} correct`}
                </p>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label={`${info.shortName} score`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={d.percentage ?? 0}
                aria-valuetext={d.percentage === null ? 'Insufficient data' : `${d.percentage}%`}
              >
                <div
                  className={cn('h-full rounded-full transition-[width] duration-700', barColor(d.percentage))}
                  style={{ width: `${d.percentage ?? 0}%` }}
                />
              </div>
              <span className={cn('self-start rounded-full px-2.5 py-1 text-xs font-semibold', descriptorColor(d.percentage))}>
                {d.percentage === null ? 'Insufficient data' : domainDescriptor(d.percentage)}
              </span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
