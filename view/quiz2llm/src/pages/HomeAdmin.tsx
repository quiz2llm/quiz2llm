import { Flex } from 'antd'
import { Header } from '../components/Header'
import { QuizThumb } from '../components/QuizThumb'
import { CreateNewQuiz } from '../components/CreateNewQuiz'
import { Footer } from '../components/Footer'
import type { Quiz } from '../App'

interface HomeAdminProps {
  quizes: Quiz[]
  onQuizClick: (quiz: Quiz) => void
  onNewQuiz: () => void
}

export function HomeAdmin({ quizes, onQuizClick, onNewQuiz }: HomeAdminProps) {
  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <Header role="admin" />
      <div style={{ flex: 1, padding: '24px 16px' }}>
        <Flex vertical gap={16} align="center">
          <Flex wrap gap={12} justify="center">
            {quizes.map((q) => (
              <QuizThumb
                key={q.id}
                title={q.title}
                date={q.date}
                showActions
                onClick={() => onQuizClick(q)}
              />
            ))}
          </Flex>
          <CreateNewQuiz onClick={onNewQuiz} />
        </Flex>
      </div>
      <Footer />
    </Flex>
  )
}
