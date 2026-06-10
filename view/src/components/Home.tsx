import { useState, useMemo } from 'react'
import { Empty, Flex } from 'antd'
import { Header } from './Header'
import { QuizCard } from './QuizCard'
import { TeacherCard } from './TeacherCard'
import { AnswerCard } from './AnswerCard'
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
  onLogin?: () => void
}

export function Home({ role, quizzes, onQuizClick, onNewQuiz, onDelete, onLogin }: HomeProps) {
  const [adminTab, setAdminTab] = useState<AdminTab>('quizzes')

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  const answeredQuizzes = useMemo(
    () => quizzes.filter((q) => q.when_answered !== null),
    [quizzes],
  )

  const teachers = useMemo(() => {
    const map = new Map<string, { count: number; firstDate: string }>()
    for (const q of quizzes) {
      const existing = map.get(q.student)
      if (existing) {
        existing.count++
        if (q.when_created < existing.firstDate) {
          existing.firstDate = q.when_created
        }
      } else {
        map.set(q.student, { count: 1, firstDate: q.when_created })
      }
    }
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      date: formatDate(data.firstDate),
      id: name,
      quizCount: data.count,
    }))
  }, [quizzes])

  const renderContent = () => {
    if (role === 'guest') {
      if (quizzes.length === 0) {
        return <div style={{ padding: '40px 0' }}><Empty description="Nenhum quiz disponível" /></div>
      }
      return (
        <Flex vertical gap={0} align="center">
          {quizzes.map((q) => (
            <QuizCard
              key={q.id}
              title={q.title}
              description={q.main_text}
              date={formatDate(q.when_created)}
              author={q.student}
              onClick={() => onQuizClick(q)}
            />
          ))}
        </Flex>
      )
    }

    if (adminTab === 'teachers') {
      if (teachers.length === 0) {
        return <div style={{ padding: '40px 0' }}><Empty description="Nenhum professor cadastrado" /></div>
      }
      return (
        <Flex vertical gap={0} align="center">
          {teachers.map((t) => (
            <TeacherCard
              key={t.name}
              name={t.name}
              date={t.date}
              id={t.id}
              quizCount={t.quizCount}
            />
          ))}
        </Flex>
      )
    }

    if (adminTab === 'answers') {
      if (answeredQuizzes.length === 0) {
        return <div style={{ padding: '40px 0' }}><Empty description="Nenhuma resposta ainda" /></div>
      }
      return (
        <Flex vertical gap={0} align="center">
          {answeredQuizzes.map((q) => (
            <AnswerCard
              key={q.id}
              title={q.title}
              question={q.main_text}
              student={q.student}
              professor=""
              date={formatDate(q.when_answered!)}
              onDelete={() => onDelete?.(q.id)}
            />
          ))}
        </Flex>
      )
    }

    if (quizzes.length === 0) {
      return <div style={{ padding: '40px 0' }}><Empty description="Nenhum quiz disponível" /></div>
    }
    return (
      <Flex vertical gap={0} align="center">
        {quizzes.map((q) => (
          <QuizCard
            key={q.id}
            title={q.title}
            description={q.main_text}
            date={formatDate(q.when_created)}
            author={q.student}
            editable
            onClick={() => onQuizClick(q)}
            onDelete={() => onDelete?.(q.id)}
          />
        ))}
      </Flex>
    )
  }

  const buttonLabel =
    role === 'admin'
      ? adminTab === 'teachers'
        ? 'novo professor'
        : adminTab === 'answers'
          ? 'novo professor'
          : undefined
      : undefined

  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <Header role={role} onLogin={onLogin} />

      {role === 'admin' && (
        <AdminMenu active={adminTab} onChange={setAdminTab} />
      )}

      <div style={{ flex: 1, width: '100%' }}>
        {renderContent()}
      </div>

      {role === 'admin' && onNewQuiz && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <CreateNewQuiz onClick={onNewQuiz} label={buttonLabel ?? 'novo quiz'} />
        </div>
      )}

      <Footer />
    </Flex>
  )
}
