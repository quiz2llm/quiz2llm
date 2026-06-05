import { useState } from 'react'
import { Typography, Button, Input, Divider, Space } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

interface NewQuizFormProps {
  onBack: () => void
}

export function NewQuizForm({ onBack }: NewQuizFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState(['', '', ''])

  const addQuestion = () => setQuestions([...questions, ''])
  const removeQuestion = (i: number) => setQuestions(questions.filter((_, idx) => idx !== i))
  const updateQuestion = (i: number, v: string) => {
    const next = [...questions]
    next[i] = v
    setQuestions(next)
  }

  const handleSubmit = () => {
    if (!title.trim()) return
    console.log({ title, description, questions: questions.filter(Boolean) })
    onBack()
  }

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
        novo quiz
      </Typography.Title>

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input.TextArea
          placeholder="Descrição do quiz"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Space>

      <Divider />

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {questions.map((q, i) => (
          <Space key={i} style={{ width: '100%' }} align="baseline">
            <Input
              placeholder={`Pergunta ${i + 1}`}
              value={q}
              onChange={(e) => updateQuestion(i, e.target.value)}
              style={{ flex: 1 }}
            />
            {questions.length > 1 && (
              <Button
                type="text"
                danger
                icon={<MinusCircleOutlined />}
                onClick={() => removeQuestion(i)}
              />
            )}
          </Space>
        ))}
        <Button type="dashed" block icon={<PlusOutlined />} onClick={addQuestion}>
          adicionar pergunta
        </Button>
      </Space>

      <Divider />

      <Space>
        <Button type="primary" onClick={handleSubmit} disabled={!title.trim()}>
          salvar
        </Button>
        <Button onClick={onBack}>cancelar</Button>
      </Space>
    </div>
  )
}
