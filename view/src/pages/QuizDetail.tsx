import { useState } from 'react'
import { Modal, Typography, Space, Button, Divider, message } from 'antd'
import { answerQuiz } from '../services/quizApi'
import type { Quiz } from '../App'

interface QuizDetailModalProps {
  open: boolean
  quiz: Quiz | null
  role: 'guest' | 'admin'
  onClose: () => void
  onAnswered?: () => void
}

export function QuizDetailModal({ open, quiz, role, onClose, onAnswered }: QuizDetailModalProps) {
  const [answering, setAnswering] = useState(false)

  if (!quiz) return null

  const submitAnswer = async () => {
    setAnswering(true)
    try {
      await answerQuiz(quiz.id)
      message.success('Resposta enviada com sucesso!')
      onAnswered?.()
      onClose()
    } catch (err) {
      message.error('Erro ao responder quiz')
    } finally {
      setAnswering(false)
    }
  }

  const handleAnswer = () => {
    if (quiz.when_answered !== null) {
      Modal.confirm({
        title: 'Responder novamente?',
        content: 'Você já respondeu este quiz. Deseja enviar uma nova resposta?',
        okText: 'Sim, responder novamente',
        cancelText: 'Cancelar',
        onOk: submitAnswer,
      })
    } else {
      submitAnswer()
    }
  }

  const isGuest = role === 'guest'

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={464}
      closable={false}
      destroyOnClose
    >
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        {quiz.title}
      </Typography.Title>

      <Typography.Text type="secondary" style={{ fontSize: 13 }}>
        estudante: {quiz.student}
      </Typography.Text>

      <Typography.Paragraph style={{ marginBottom: 24, fontSize: 16, marginTop: 12 }}>
        {quiz.main_text}
      </Typography.Paragraph>

      <Divider />

      <Space direction="vertical" size={12} style={{ width: '100%', marginBottom: 24 }}>
        {quiz.question?.map((q, i) => (
          <Typography.Text key={i} style={{ fontSize: 16 }}>
            {i + 1}. {q}
          </Typography.Text>
        ))}
      </Space>

      {isGuest && (
        <Button
          type="primary"
          size="large"
          block
          onClick={handleAnswer}
          loading={answering}
        >
          {quiz.when_answered !== null ? 'responder novamente' : 'responder'}
        </Button>
      )}
    </Modal>
  )
}
