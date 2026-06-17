import { Layout, Flex, Typography, Divider, theme } from 'antd'
import { GithubOutlined, LinkedinOutlined, CodeOutlined } from '@ant-design/icons'
import { IconText } from './IconText'

export function Footer() {
  const { token } = theme.useToken()
  const isDark = token.colorBgLayout === '#000000'
  const footerBg = isDark ? '#0e0e0e' : '#d7d7d7'

  return (
    <Layout.Footer
      style={{
        background: footerBg,
        padding: '10px 16px',
      }}
    >
      <Flex justify="space-between" align="flex-start" gap={16}>
        <IconText icon={<GithubOutlined />} label="Kani0dev" href="https://github.com" />
        <IconText icon={<LinkedinOutlined />} label="Kani0dev" href="https://linkedin.com" />
        <div style={{ textAlign: 'center' }}>
          <Flex align="center" gap={6} style={{ marginBottom: 4 }}>
            <CodeOutlined />
            <Typography.Text style={{ fontSize: 14, color: token.colorText }}>About</Typography.Text>
          </Flex>
          <Typography.Paragraph
            style={{ margin: 0, fontSize: 12, color: token.colorTextTertiary, maxWidth: 158 }}
          >
            lorem ipson bral
            bla bla pa pum
            pirulito pao doce
          </Typography.Paragraph>
        </div>
      </Flex>
      <Divider style={{ margin: '8px 0' }} />
      <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', textAlign: 'center' }}>
        quiz2llm &copy; {new Date().getFullYear()}
      </Typography.Text>
    </Layout.Footer>
  )
}
