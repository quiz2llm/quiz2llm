import { theme, Typography } from 'antd'

interface TeacherCardProps {
  name: string
  date: string
  id: string
  quizCount: number
}

export function TeacherCard({ name, date, id, quizCount }: TeacherCardProps) {
  const { token } = theme.useToken()

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderTop: `2px solid ${token.colorText}`,
        borderRight: `1px solid ${token.colorText}`,
        borderBottom: `1px solid ${token.colorText}`,
        borderLeft: `1px solid ${token.colorText}`,
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          width: 94,
          height: 83,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{ width: 24, height: 24 }} />
      </div>

      <div
        style={{
          flex: 1,
          height: 83,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 10px',
        }}
      >
        <Typography.Text style={{ fontSize: 16, color: token.colorText }}>
          {name}
        </Typography.Text>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            height: 36,
          }}
        >
          <Typography.Text style={{ fontSize: 16, color: token.colorTextTertiary }}>
            {date}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 16, color: token.colorTextTertiary }}>
            {id}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 16, color: token.colorTextTertiary }}>
            {quizCount}
          </Typography.Text>
        </div>
      </div>
    </div>
  )
}
