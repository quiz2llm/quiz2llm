import { Flex } from 'antd'
import { Header } from '../components/Header'
import { QuizThumb } from '../components/QuizThumb'
import { Footer } from '../components/Footer'
import type { Quiz } from '../App'

interface HomeGuestProps {
  quizes: Quiz[]
  onQuizClick: (quiz: Quiz) => void
}

export function HomeGuest({ quizes, onQuizClick }: HomeGuestProps) {
  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <Header role="guest" />
      <div style={{ flex: 1, padding: '24px 16px' }}>
        <Flex wrap gap={12} justify="center">
          {quizes.map((q) => (
            <QuizThumb
              key={q.id}
              title={q.title}
              date={q.date}
              onClick={() => onQuizClick(q)}
            />
          ))}
        </Flex>
      </div>
      <Footer />
    </Flex>
  )
}
