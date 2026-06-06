import { Card, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateNewQuizProps {
  onClick?: () => void
}

export function CreateNewQuiz({ onClick }: CreateNewQuizProps) {
  return (
    <Card
      hoverable
      size="small"
      onClick={onClick}
      style={{
        width: 148,
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '4px 0',
        }}
      >
        <PlusOutlined />
        <Typography.Text>novo quiz</Typography.Text>
      </div>
    </Card>
  )
}
