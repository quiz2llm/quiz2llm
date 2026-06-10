import { Menu } from 'antd'
import { UserOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons'

export type AdminTab = 'quizzes' | 'teachers' | 'answers'

interface AdminMenuProps {
  active: AdminTab
  onChange: (tab: AdminTab) => void
}

const ITEMS = [
  { key: 'quizzes', label: 'Quizzes', icon: <FileTextOutlined /> },
  { key: 'teachers', label: 'Teachers', icon: <UserOutlined /> },
  { key: 'answers', label: 'Answers', icon: <CheckCircleOutlined /> },
]

export function AdminMenu({ active, onChange }: AdminMenuProps) {
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[active]}
      onClick={({ key }) => onChange(key as AdminTab)}
      items={ITEMS}
      style={{ width: '100%', justifyContent: 'center' }}
    />
  )
}
