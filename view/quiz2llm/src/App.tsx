import { useState } from 'react'
import { ConfigProvider, Layout, Switch, Space, Segmented } from 'antd'
import { useTheme } from './hooks/useTheme'
import { HomeGuest } from './pages/HomeGuest'
import { HomeAdmin } from './pages/HomeAdmin'
import { QuizDetail } from './pages/QuizDetail'
import { NewQuizForm } from './pages/NewQuizForm'

export interface Quiz {
  id: string
  title: string
  date: string
  description: string
  questions: string[]
}

const MOCK_QUIZES: Quiz[] = [
  { id: '1', title: 'React', date: '01/06', description: 'Conceitos fundamentais do React', questions: ['O que é React?', 'O que é JSX?', 'O que são hooks?'] },
  { id: '2', title: 'Node.js', date: '02/06', description: 'Fundamentos do Node.js', questions: ['O que é Node.js?', 'O que é npm?', 'O que é event loop?'] },
  { id: '3', title: 'CSS', date: '03/06', description: 'Conceitos de CSS', questions: ['O que é flexbox?', 'O que é grid?', 'O que é especificidade?'] },
  { id: '4', title: 'TS', date: '04/06', description: 'Conceitos de TypeScript', questions: ['O que é TypeScript?', 'O que são tipos?', 'O que é interface?'] },
  { id: '5', title: 'Git', date: '05/06', description: 'Comandos básicos do Git', questions: ['O que é git?', 'O que é commit?', 'O que é branch?'] },
]

type Role = 'guest' | 'admin'
type Page = 'home' | 'quiz-detail' | 'new-quiz'

function App() {
  const { mode, toggleTheme, themeConfig } = useTheme()
  const [role, setRole] = useState<Role>('guest')
  const [page, setPage] = useState<Page>('home')
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

  const goHome = () => setPage('home')

  if (page === 'quiz-detail' && selectedQuiz) {
    return (
      <ConfigProvider theme={themeConfig}>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Content style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
            <QuizDetail quiz={selectedQuiz} onBack={goHome} />
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    )
  }

  if (page === 'new-quiz') {
    return (
      <ConfigProvider theme={themeConfig}>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Content style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
            <NewQuizForm onBack={goHome} />
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 12,
              padding: '8px 16px 0',
            }}
          >
            <Segmented
              options={[
                { label: 'Guest', value: 'guest' },
                { label: 'Admin', value: 'admin' },
              ]}
              value={role}
              onChange={(v) => setRole(v as Role)}
            />
            <Space>
              <span style={{ fontSize: 12 }}>{mode === 'light' ? '☀️' : '🌙'}</span>
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                size="small"
              />
            </Space>
          </div>
          {role === 'guest' ? (
            <HomeGuest
              quizes={MOCK_QUIZES}
              onQuizClick={(q) => { setSelectedQuiz(q); setPage('quiz-detail') }}
            />
          ) : (
            <HomeAdmin
              quizes={MOCK_QUIZES}
              onQuizClick={(q) => { setSelectedQuiz(q); setPage('quiz-detail') }}
              onNewQuiz={() => setPage('new-quiz')}
            />
          )}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
