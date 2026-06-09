import { useState } from 'react'
import { Empty, Flex, Typography, Divider } from 'antd'
import { QuizCard } from './QuizCard'
import { QuizCardAdmin } from './QuizCardAdmin'
import { AdminMenu, type AdminTab } from './AdminMenu'
import { CreateNewQuiz } from './CreateNewQuiz'
import { Footer } from './Footer'
import type { Quiz } from '../App'

interface HomeProps {
  role: 'guest' | 'admin'
  quizzes: Quiz[]
  onQuizClick: (quiz: Quiz) => void
  onNewQuiz?: () => void
  onDelete?: (id: string) => void
}

export function Home({ role, quizzes, onQuizClick, onNewQuiz, onDelete }: HomeProps) {
  const [adminTab, setAdminTab] = useState<AdminTab>('quizzes')

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <div style={{ padding: '8px 16px', background: 'transparent' }}>
        <Typography.Title level={4} style={{ margin: 0, textAlign: 'center' }}>
          {role === 'admin' ? 'quizes' : 'quizes'}
        </Typography.Title>
        <Divider style={{ margin: '8px 0 0' }} />
      </div>

      {role === 'admin' && (
        <AdminMenu active={adminTab} onChange={setAdminTab} />
      )}

      <div style={{ flex: 1, width: '100%' }}>
        {role === 'admin' && adminTab !== 'quizzes' ? (
          <div style={{ padding: '40px 0' }}>
            <Empty
              description={
                adminTab === 'teachers' ? 'Nenhum professor cadastrado' : 'Nenhuma resposta ainda'
              }
            />
          </div>
        ) : quizzes.length === 0 ? (
          <div style={{ padding: '40px 0' }}>
            <Empty description="Nenhum quiz disponível" />
          </div>
        ) : (
          <Flex vertical gap={0} align="center">
            {quizzes.map((q) => {
              const dateStr = formatDate(q.when_created)
              if (role === 'admin') {
                return (
                  <QuizCardAdmin
                    key={q.id}
                    title={q.title}
                    question={q.main_text}
                    date={dateStr}
                    professor={q.student}
                    showActions
                    onClick={() => onQuizClick(q)}
                    onDelete={() => onDelete?.(q.id)}
                  />
                )
              }
              return (
                <QuizCard
                  key={q.id}
                  title={q.title}
                  question={q.main_text}
                  date={dateStr}
                  professor={q.student}
                  onClick={() => onQuizClick(q)}
                />
              )
            })}
          </Flex>
        )}
      </div>

      {role === 'admin' && onNewQuiz && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <CreateNewQuiz onClick={onNewQuiz} />
        </div>
      )}

      <Footer />
    </Flex>
  )
}
