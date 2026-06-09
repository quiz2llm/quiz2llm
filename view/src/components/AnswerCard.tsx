import { theme, Typography } from 'antd'

interface AnswerCardProps {
  title: string
  question: string
  student: string
  professor: string
  date: string
  onDelete?: () => void
}

export function AnswerCard({ title, question, student, professor, date, onDelete }: AnswerCardProps) {
  const { token } = theme.useToken()

  return (
    <div
      style={{
        width: '100%',
        borderTop: `2px solid ${token.colorBorder}`,
        background: token.colorBgContainer,
      }}
    >
      <div style={{ position: 'relative', height: 55 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 26,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography.Text style={{ fontSize: 16, color: token.colorText }}>
              {title}
            </Typography.Text>
            <div style={{ width: 24, height: 24 }} />
          </div>
          <div
            style={{ width: 44, height: 24, cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
          />
        </div>
        <Typography.Text
          style={{
            position: 'absolute',
            left: 18,
            bottom: 8,
            fontSize: 16,
            color: token.colorText,
          }}
        >
          {question}
        </Typography.Text>
      </div>

      <div
        style={{
          height: 36,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography.Text style={{ fontSize: 16, color: token.colorTextTertiary }}>
          {student}
        </Typography.Text>
        <Typography.Text style={{ fontSize: 16, color: token.colorTextTertiary }}>
          {professor}
        </Typography.Text>
        <Typography.Text style={{ fontSize: 12, color: token.colorTextTertiary }}>
          {date}
        </Typography.Text>
      </div>
    </div>
  )
}
