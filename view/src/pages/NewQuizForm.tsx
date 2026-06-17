import { useState } from 'react'
import { Form, Input, Button, Typography, Space, message } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { createQuiz } from '../services/quizApi'

interface NewQuizFormProps {
  onBack: () => void
  onCreated: () => void
}

interface FormValues {
  title: string
  main_text: string
  question: string[]
}

export function NewQuizForm({ onBack, onCreated }: NewQuizFormProps) {
  const [form] = Form.useForm<FormValues>()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      await createQuiz({
        title: values.title.trim(),
        main_text: values.main_text.trim(),
        question: values.question.filter(Boolean),
        student: 'beforeModel',
      })
      message.success('Quiz criado com sucesso!')
      onCreated()
      onBack()
    } catch (err) {
      message.error('Erro ao criar quiz')
    } finally {
      setSubmitting(false)
    }
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

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ question: ['', '', ''] }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Título é obrigatório' }]}
        >
          <Input placeholder="Título" />
        </Form.Item>

        <Form.Item name="main_text">
          <Input.TextArea placeholder="Texto principal" rows={3} />
        </Form.Item>

        <Typography.Text strong style={{ display: 'block', marginBottom: 12 }}>
          Perguntas
        </Typography.Text>

        <Form.List name="question">
          {(fields, { add, remove }) => (
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              {fields.map(({ key, name }) => (
                <Space key={key} style={{ width: '100%' }} align="baseline">
                  <Form.Item
                    name={name}
                    rules={[{ required: true, message: 'Preencha ou remova' }]}
                    style={{ flex: 1, marginBottom: 0 }}
                  >
                    <Input placeholder={`Pergunta ${name + 1}`} />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    />
                  )}
                </Space>
              ))}
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add()}>
                  adicionar pergunta
                </Button>
              </Form.Item>
            </Space>
          )}
        </Form.List>

        <div style={{ marginTop: 24 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting}>
              salvar
            </Button>
            <Button onClick={onBack}>cancelar</Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}
