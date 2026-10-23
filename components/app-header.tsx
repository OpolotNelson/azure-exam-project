import Link from 'next/link'

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect width="32" height="32" rx="9" fill="#0F172A" />
      <path
        d="M8 23c3.5 0 4.5-3 6-6.5S17.5 10 22 10"
        stroke="#2563EB"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M8 23c3.5 0 4.5-3 6-6.5"
        stroke="#06B6D4"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="8" cy="23" r="2" fill="#06B6D4" />
      <path
        d="M23.5 5.5l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label="AzurePath  home"
        >
          <LogoMark />
          <span className="text-base font-semibold tracking-tight text-navy">
            AzurePath <span className="text-primary">AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            AZ-900 Practice
          </span>
        </div>
      </div>
    </header>
  )
}
