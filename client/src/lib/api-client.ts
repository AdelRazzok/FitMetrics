export const API_BASE_URL = 'http://localhost:3000/api'

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || 'Une erreur est survenue lors de la requête.',
    )
  }

  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}
