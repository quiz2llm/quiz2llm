import { Typography, Space, Divider, Button } from 'antd'

interface HeaderProps {
  role: 'guest' | 'admin'
  onLogin?: () => void
}

export function Header({ role, onLogin }: HeaderProps) {
  return (
    <div style={{ padding: '8px 16px', background: 'transparent' }}>
      <Space
        style={{ width: '100%', justifyContent: 'space-between' }}
        align="center"
      >
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>
          {role.toUpperCase()}
        </Typography.Text>
        <Typography.Title level={4} style={{ margin: 0 }}>
          quizes
        </Typography.Title>
        {role === 'guest' ? (
          <Button type="text" onClick={onLogin}>
            login
          </Button>
        ) : (
          <div style={{ width: 52 }} />
        )}
      </Space>
      <Divider style={{ margin: '8px 0 0' }} />
    </div>
  )
}
