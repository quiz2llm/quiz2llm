import axios from 'axios'

export interface QuizResponse {
  id: string
  title: string
  main_text: string
  question: string[] | null
  student: string
  when_created: string
  when_answered: string | null
}

const api = axios.create({
  baseURL: '/',
})

export async function fetchQuizzes(): Promise<QuizResponse[]> {
  const { data } = await api.get<QuizResponse[]>('/quiz')
  return data
}

export async function fetchQuiz(id: string): Promise<QuizResponse> {
  const { data } = await api.get<QuizResponse>(`/quiz/${id}`)
  return data
}

export interface CreateQuizPayload {
  title: string
  main_text: string
  question: string[]
  student: string
}

export async function createQuiz(payload: CreateQuizPayload): Promise<QuizResponse> {
  const { data } = await api.post<QuizResponse>('/quiz', payload)
  return data
}

export interface UpdateQuizPayload {
  title?: string
  main_text?: string
  question?: string[]
  student?: string
}

export async function updateQuiz(id: string, payload: UpdateQuizPayload): Promise<QuizResponse> {
  const { data } = await api.put<QuizResponse>(`/quiz/${id}`, payload)
  return data
}

export async function deleteQuiz(id: string): Promise<void> {
  await api.delete(`/quiz/${id}`)
}

export async function answerQuiz(id: string): Promise<QuizResponse> {
  const { data } = await api.patch<QuizResponse>(`/quiz/${id}/answer`)
  return data
}
