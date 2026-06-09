import { useState } from 'react'
import { Input, Button, Typography, Space } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

interface LoginScreenProps {
  onLoginSuccess: () => void
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onLoginSuccess()
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
      }}
    >
      <div
        style={{
          width: 344,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <Input
          size="large"
          placeholder="username..."
          prefix={<UserOutlined />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onPressEnter={handleSubmit}
          style={{ width: '100%', height: 52 }}
        />
        <Input.Password
          size="large"
          placeholder="senha.."
          prefix={<LockOutlined />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={handleSubmit}
          style={{ width: '100%', height: 52 }}
        />
        <Button
          type="default"
          size="large"
          onClick={handleSubmit}
          style={{
            width: 105,
            height: 56,
            fontSize: 16,
          }}
        >
          clique
        </Button>
      </div>
    </div>
  )
}
