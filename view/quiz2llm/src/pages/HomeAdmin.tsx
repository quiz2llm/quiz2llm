import { Flex } from 'antd'
import { Header } from '../components/Header'
import { QuizThumb } from '../components/QuizThumb'
import { CreateNewQuiz } from '../components/CreateNewQuiz'
import { Footer } from '../components/Footer'

const MOCK_QUIZES = [
  { title: 'React', date: '01/06' },
  { title: 'Node.js', date: '02/06' },
  { title: 'CSS', date: '03/06' },
  { title: 'TS', date: '04/06' },
  { title: 'Git', date: '05/06' },
]

export function HomeAdmin() {
  return (
    <Flex vertical style={{ minHeight: '100%' }} gap={0}>
      <Header role="admin" />
      <div style={{ flex: 1, padding: '24px 16px' }}>
        <Flex vertical gap={16} align="center">
          <CreateNewQuiz onClick={() => alert('create new quiz')} />
          <Flex wrap gap={12} justify="center">
            {MOCK_QUIZES.map((q) => (
              <QuizThumb key={q.title} title={q.title} date={q.date} showActions />
            ))}
          </Flex>
        </Flex>
      </div>
      <Footer />
    </Flex>
  )
}
