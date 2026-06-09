import { theme, Typography } from 'antd'

interface QuizCardProps {
  title: string
  question: string
  date: string
  professor: string
  onClick?: () => void
}

export function QuizCard({ title, question, date, professor, onClick }: QuizCardProps) {
  const { token } = theme.useToken()

  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        cursor: 'pointer',
        borderTop: `1px solid ${token.colorBorder}`,
        borderBottom: `1px solid ${token.colorBorder}`,
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          padding: '0 18px',
          height: 55,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 7,
        }}
      >
        <Typography.Text style={{ fontSize: 16, color: token.colorText }}>
          {title}
        </Typography.Text>
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          style={{ margin: 0, fontSize: 16, color: token.colorText }}
        >
          {question}
        </Typography.Paragraph>
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
          {date}
        </Typography.Text>
        <Typography.Text style={{ fontSize: 16, color: token.colorTextTertiary }}>
          {professor}
        </Typography.Text>
      </div>
    </div>
  )
}
