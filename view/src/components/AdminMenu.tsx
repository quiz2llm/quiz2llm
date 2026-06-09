import { theme } from 'antd'

export type AdminTab = 'quizzes' | 'teachers' | 'answers'

interface AdminMenuProps {
  active: AdminTab
  onChange: (tab: AdminTab) => void
}

const TABS: { key: AdminTab; label: string }[] = [
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'answers', label: 'Answers' },
]

export function AdminMenu({ active, onChange }: AdminMenuProps) {
  const { token } = theme.useToken()

  return (
    <div
      style={{
        width: '100%',
        height: 41,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: token.colorBgContainer,
      }}
    >
      {TABS.map((tab) => (
        <div
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            padding: '0 16px',
            borderBottom: active === tab.key ? `2px solid ${token.colorText}` : '2px solid transparent',
            color: active === tab.key ? token.colorText : token.colorTextTertiary,
            transition: 'all 0.2s',
          }}
        >
          <div style={{ width: 24, height: 24 }} />
          <span style={{ fontSize: 14 }}>{tab.label}</span>
        </div>
      ))}
    </div>
  )
}
