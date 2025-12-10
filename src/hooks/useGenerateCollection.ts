import { useMutation } from '@tanstack/react-query'
import type { GenerateCollectionResponse } from '@/mocks/handlers'

export function useGenerateCollection() {
  return useMutation({
    mutationFn: async (payload: { userPrompt: string; category?: string }) => {
      const response = await fetch('/api/ai/generate-collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to generate collection')
      }

      return response.json() as Promise<GenerateCollectionResponse>
    },
  })
}
