import { Card, Typography, Button, Space, theme } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { QuizCardMeta } from './QuizCardMeta'

interface QuizCardProps {
  title: string
  description: string
  date: string
  author: string
  extraInfo?: string
  editable?: boolean
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function QuizCard({
  title,
  description,
  date,
  author,
  extraInfo,
  editable,
  onClick,
  onEdit,
  onDelete,
}: QuizCardProps) {
  const { token } = theme.useToken()

  return (
    <Card
      hoverable
      bordered={false}
      size="small"
      onClick={onClick}
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column' },
      }}
      style={{
        width: '100%',
        borderTop: `${editable ? 2 : 1}px solid ${token.colorBorderSecondary}`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: 0,
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          height: 55,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 18px',
        }}
      >
        {editable ? (
          <Space style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space size={4} align="center">
              <Typography.Text
                style={{ fontSize: 16, color: token.colorText }}
              >
                {title}
              </Typography.Text>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => { e.stopPropagation(); onEdit?.() }}
                style={{ width: 24, height: 24 }}
              />
            </Space>
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => { e.stopPropagation(); onDelete?.() }}
              style={{ width: 44, height: 24 }}
            />
          </Space>
        ) : (
          <>
            <Typography.Text style={{ fontSize: 16, color: token.colorText }}>
              {title}
            </Typography.Text>
            <Typography.Paragraph
              ellipsis={{ rows: 1 }}
              style={{ margin: 0, fontSize: 16, color: token.colorText }}
            >
              {description}
            </Typography.Paragraph>
          </>
        )}
      </div>

      <div style={{ padding: '0 18px' }}>
        <QuizCardMeta date={date} author={author} extraInfo={extraInfo} />
      </div>
    </Card>
  )
}
