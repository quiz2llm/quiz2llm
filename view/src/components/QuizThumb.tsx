import { useState } from 'react'
import { Card, Typography, Space, Button, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { CSSProperties } from 'react'

interface QuizThumbProps {
  title: string
  date: string
  showActions?: boolean
  onClick?: () => void
}

export function QuizThumb({ title, date, showActions, onClick }: QuizThumbProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      hoverable
      size="small"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      styles={{
        body: { padding: 0, position: 'relative' as CSSProperties['position'] },
      }}
      style={{ width: 130, borderRadius: 6, overflow: 'hidden', position: 'relative' }}
    >
      {showActions && hovered && (
        <Space style={{ position: 'absolute', top: 2, left: 4, zIndex: 1 }}>
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              shape="circle"
              style={{ width: 20, height: 20, minWidth: 20 }}
              onClick={(e) => e.stopPropagation()}
            />
          </Tooltip>
        </Space>
      )}
      {showActions && hovered && (
        <div style={{ position: 'absolute', top: 2, right: 4, zIndex: 1 }}>
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              shape="circle"
              style={{ width: 20, height: 20, minWidth: 20 }}
              onClick={(e) => e.stopPropagation()}
            />
          </Tooltip>
        </div>
      )}

      <div
        style={{
          height: 72,
          background: 'rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          preview
        </Typography.Text>
      </div>

      <div
        style={{
          background: '#000',
          padding: '4px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Text
          style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}
        >
          {title}
        </Typography.Text>
        <Typography.Text style={{ color: '#fff', fontSize: 11 }}>
          {date}
        </Typography.Text>
      </div>
    </Card>
  )
}
