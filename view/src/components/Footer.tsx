import { Divider, Typography, Space } from 'antd'

export function Footer() {
  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <Divider />
      <Space>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          quiz2llm &copy; {new Date().getFullYear()}
        </Typography.Text>
      </Space>
    </div>
  )
}
