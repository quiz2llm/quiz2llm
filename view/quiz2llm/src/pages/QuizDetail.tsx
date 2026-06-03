import { Typography, Button, Space, Divider } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { Quiz } from '../App'

interface QuizDetailProps {
  quiz: Quiz
  onBack: () => void
}

export function QuizDetail({ quiz, onBack }: QuizDetailProps) {
  return (
    <div style={{ padding: '16px 24px' }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: 16, padding: 0 }}
      >
        voltar
      </Button>

      <Typography.Title level={4} style={{ marginTop: 0 }}>
        {quiz.title}
      </Typography.Title>

      <Typography.Paragraph
        style={{ marginBottom: 24, fontSize: 16 }}
      >
        {quiz.description}
      </Typography.Paragraph>

      <Divider />

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {quiz.questions.map((q, i) => (
          <Typography.Text key={i} style={{ fontSize: 16 }}>
            {i + 1}. {q}
          </Typography.Text>
        ))}
      </Space>
    </div>
  )
}
