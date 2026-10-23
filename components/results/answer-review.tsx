import { CheckCircle2, XCircle } from 'lucide-react'
import { getQuestionById } from '@/lib/questions'
import type { SubmittedAnswer } from '@/lib/quiz-types'

export function AnswerReview({ answers }: { answers: SubmittedAnswer[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {answers.map((answer, i) => {
        const q = getQuestionById(answer.questionId)
        if (!q) return null
        const selected = q.options.find((o) => o.id === answer.selectedAnswerId)!
        const correct = q.options.find((o) => o.id === q.correctAnswerId)!
        return (
          <li key={q.id}>
            <details className="group rounded-2xl border border-border bg-card shadow-sm open:shadow-md">
              <summary className="flex cursor-pointer list-none items-start gap-3 rounded-2xl p-4 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                {answer.isCorrect ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-label="Correct" />
                ) : (
                  <XCircle className="mt-0.5 size-5 shrink-0 text-error" aria-label="Incorrect" />
                )}
                <span className="flex-1 text-pretty font-medium leading-snug text-navy">
                  <span className="text-muted-foreground">{i + 1}. </span>
                  {q.question}
                </span>
                <span className="shrink-0 text-xs font-medium text-primary group-open:hidden">Show</span>
                <span className="hidden shrink-0 text-xs font-medium text-primary group-open:inline">Hide</span>
              </summary>
              <div className="flex flex-col gap-3 border-t border-border px-4 py-4 text-sm sm:pl-12">
                <p className="text-xs font-medium text-muted-foreground">
                  {q.domainName} · {q.topic}
                </p>
                <p>
                  <span className="font-semibold text-navy">Your answer: </span>
                  <span className={answer.isCorrect ? 'text-green-700' : 'text-error'}>
                    {selected.id.toUpperCase()}. {selected.text}
                  </span>
                </p>
                {!answer.isCorrect && (
                  <p>
                    <span className="font-semibold text-navy">Correct answer: </span>
                    <span className="text-green-700">
                      {correct.id.toUpperCase()}. {correct.text}
                    </span>
                  </p>
                )}
                <p className="text-pretty leading-relaxed text-navy">{q.explanation}</p>
                {!answer.isCorrect && (
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {q.optionExplanations[selected.id]}
                  </p>
                )}
              </div>
            </details>
          </li>
        )
      })}
    </ol>
  )
}
