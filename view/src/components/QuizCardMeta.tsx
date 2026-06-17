import { Descriptions } from 'antd'

interface QuizCardMetaProps {
  date: string
  author: string
  extraInfo?: string
}

export function QuizCardMeta({ date, author, extraInfo }: QuizCardMetaProps) {
  return (
    <Descriptions
      size="small"
      column={3}
      colon={false}
      styles={{
        content: { paddingBottom: 0, paddingTop: 0 },
      }}
    >
      <Descriptions.Item>{date}</Descriptions.Item>
      <Descriptions.Item>{author}</Descriptions.Item>
      {extraInfo ? (
        <Descriptions.Item>{extraInfo}</Descriptions.Item>
      ) : (
        <Descriptions.Item />
      )}
    </Descriptions>
  )
}
