import { ExternalLink } from 'lucide-react'

export const STUDY_GUIDE_URL =
  'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900'

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-navy">
            AzurePath AI — Built for the #1MillionDevs Vibe Coding Hackathon 2026.
          </p>
          <p>
            AzurePath AI is an unofficial learning tool and is not affiliated with or endorsed by
            Microsoft.
          </p>
        </div>
        <a
          href={STUDY_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:self-auto"
        >
          Official AZ-900 study guide
          <ExternalLink className="size-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </footer>
  )
}
