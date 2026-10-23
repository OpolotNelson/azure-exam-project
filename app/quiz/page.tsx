import type { Metadata } from 'next'
import { QuizExperience } from '@/components/quiz/quiz-experience'

export const metadata: Metadata = {
  title: 'Practice Quiz',
  description: 'Answer AZ-900 practice questions with instant feedback and AI explanations.',
}

export default function QuizPage() {
  return <QuizExperience />
}
