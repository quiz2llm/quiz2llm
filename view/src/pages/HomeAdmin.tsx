import { Flex, Empty } from 'antd'
import { Header } from '../components/Header'
import { QuizThumb } from '../components/QuizThumb'
import { CreateNewQuiz } from '../components/CreateNewQuiz'
import { Footer } from '../components/Footer'
import type { Quiz } from '../App'

interface HomeAdminProps {
  quizzes: Quiz[]
  onQuizClick: (quiz: Quiz) => void
  onNewQuiz: () => void
  onDelete: (id: string) => void
}

export function HomeAdmin({ quizzes, onQuizClick, onNewQuiz, onDelete }: HomeAdminProps) {
  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <Header role="admin" />
      <div style={{ flex: 1, padding: '24px 16px' }}>
        <Flex vertical gap={16} align="center">
          {quizzes.length === 0 ? (
            <Empty description="Nenhum quiz criado" />
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
                    showActions
                    onClick={() => onQuizClick(q)}
                    onDelete={() => onDelete(q.id)}
                  />
                )
              })}
            </Flex>
          )}
          <CreateNewQuiz onClick={onNewQuiz} />
        </Flex>
      </div>
      <Footer />
    </Flex>
  )
}
