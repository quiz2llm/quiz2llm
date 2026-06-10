import { Space, Typography } from 'antd'

interface IconTextProps {
  icon: React.ReactNode
  label: string
  href?: string
}

export function IconText({ icon, label, href }: IconTextProps) {
  const content = (
    <Space size={6} align="center">
      {icon}
      <Typography.Text style={{ color: 'inherit' }}>{label}</Typography.Text>
    </Space>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
        {content}
      </a>
    )
  }

  return content
}
