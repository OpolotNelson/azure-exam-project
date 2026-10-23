import type { Metadata } from 'next'
import { ResultsReport } from '@/components/results/results-report'

export const metadata: Metadata = {
  title: 'Your Learning Report',
  description: 'See your AZ-900 practice performance by domain and what to study next.',
}

export default function ResultsPage() {
  return <ResultsReport />
}
