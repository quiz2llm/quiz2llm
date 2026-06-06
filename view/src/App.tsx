import { useState, useEffect, useCallback } from 'react'
import { ConfigProvider, Layout, Switch, Space, Segmented, Spin } from 'antd'
import { useTheme } from './hooks/useTheme'
import { HomeGuest } from './pages/HomeGuest'
import { HomeAdmin } from './pages/HomeAdmin'
import { QuizDetail } from './pages/QuizDetail'
import { NewQuizForm } from './pages/NewQuizForm'
import { fetchQuizzes, deleteQuiz, type QuizResponse } from './services/quizApi'

export type { QuizResponse }
export type Quiz = QuizResponse

type Role = 'guest' | 'admin'
type Page = 'home' | 'quiz-detail' | 'new-quiz'

function App() {
  const { mode, toggleTheme, themeConfig } = useTheme()
  const [role, setRole] = useState<Role>('guest')
  const [page, setPage] = useState<Page>('home')
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  const loadQuizzes = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchQuizzes()
      setQuizzes(data)
    } catch (err) {
      console.error('Failed to load quizzes', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadQuizzes()
  }, [loadQuizzes])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteQuiz(id)
      setQuizzes((prev) => prev.filter((q) => q.id !== id))
    } catch (err) {
      console.error('Failed to delete quiz', err)
    }
  }, [])

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
            <NewQuizForm onBack={goHome} onCreated={loadQuizzes} />
          </Layout.Content>
        </Layout>
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content style={{ margin: '0 auto', width: '100%' }}>
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

          {loading ? (
            <div style={{ textAlign: 'center', paddingTop: 80 }}>
              <Spin size="large" />
            </div>
          ) : role === 'guest' ? (
            <HomeGuest
              quizzes={quizzes}
              onQuizClick={(q) => { setSelectedQuiz(q); setPage('quiz-detail') }}
            />
          ) : (
            <HomeAdmin
              quizzes={quizzes}
              onQuizClick={(q) => { setSelectedQuiz(q); setPage('quiz-detail') }}
              onNewQuiz={() => setPage('new-quiz')}
              onDelete={handleDelete}
            />
          )}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
