import { Flex, Empty } from 'antd'
import { Header } from '../components/Header'
import { QuizThumb } from '../components/QuizThumb'
import { Footer } from '../components/Footer'
import type { Quiz } from '../App'

interface HomeGuestProps {
  quizzes: Quiz[]
  onQuizClick: (quiz: Quiz) => void
}

export function HomeGuest({ quizzes, onQuizClick }: HomeGuestProps) {
  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <Header role="guest" />
      <div style={{ flex: 1, padding: '24px 16px' }}>
        {quizzes.length === 0 ? (
          <Empty description="Nenhum quiz disponível" />
        ) : (
          <Flex wrap gap={12} justify="center">
            {quizzes.map((q) => {
              const created = new Date(q.when_created)
              const dateStr = `${String(created.getDate()).padStart(2, '0')}/${String(created.getMonth() + 1).padStart(2, '0')}`
              return (
                <QuizThumb
                  key={q.id}
                  title={q.title}
                  date={dateStr}
                  onClick={() => onQuizClick(q)}
                />
              )
            })}
          </Flex>
        )}
      </div>
      <Footer />
    </Flex>
  )
}
