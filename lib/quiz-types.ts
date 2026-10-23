export type DomainId =
  | 'cloud-concepts'
  | 'architecture-services'
  | 'management-governance'

export type Difficulty = 'beginner' | 'intermediate'

export type OptionId = 'a' | 'b' | 'c' | 'd'

export interface QuestionOption {
  id: OptionId
  text: string
}

export interface Question {
  id: string
  domainId: DomainId
  domainName: string
  topic: string
  difficulty: Difficulty
  question: string
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption]
  correctAnswerId: OptionId
  explanation: string
  optionExplanations: Record<OptionId, string>
  learningTip: string
  learnMoreUrl: string
}

export interface DomainInfo {
  id: DomainId
  name: string
  shortName: string
  weighting: string
  questionsPerQuiz: number
}

export interface SubmittedAnswer {
  questionId: string
  selectedAnswerId: OptionId
  isCorrect: boolean
  answeredAt: number
}

export interface ActiveQuiz {
  version: 1
  sessionId: string
  questionIds: string[]
  currentIndex: number
  answers: Record<string, SubmittedAnswer>
  startedAt: number
}

export interface DomainResult {
  domainId: DomainId
  correct: number
  total: number
  percentage: number | null
}

export interface QuizAttempt {
  version: 1
  sessionId: string
  questionIds: string[]
  answers: SubmittedAnswer[]
  startedAt: number
  completedAt: number
  correct: number
  total: number
  percentage: number
  domains: DomainResult[]
}

export type TopicStatus =
  | 'strong'
  | 'worth-revisiting'
  | 'needs-practice'

export interface TopicResult {
  topic: string
  domainId: DomainId
  correct: number
  total: number
  status: TopicStatus
  learnMoreUrl: string
  missedQuestionIds: string[]
}

export interface AiExplanation {
  simpleExplanation: string
  realWorldExample: string
  memoryTip: string
}
