import { useState } from 'react'
import { ConfigProvider, Layout, Switch, Space, Segmented } from 'antd'
import { useTheme } from './hooks/useTheme'
import { HomeGuest } from './pages/HomeGuest'
import { HomeAdmin } from './pages/HomeAdmin'

type Role = 'guest' | 'admin'

function App() {
  const { mode, toggleTheme, themeConfig } = useTheme()
  const [role, setRole] = useState<Role>('guest')

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 12,
              padding: '8px 16px 0',
            }}
          >
            <Segmented
              options={[
                { label: 'Guest', value: 'guest' },
                { label: 'Admin', value: 'admin' },
              ]}
              value={role}
              onChange={(v) => setRole(v as Role)}
            />
            <Space>
              <span style={{ fontSize: 12 }}>{mode === 'light' ? '☀️' : '🌙'}</span>
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                size="small"
              />
            </Space>
          </div>
          {role === 'guest' ? <HomeGuest /> : <HomeAdmin />}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
