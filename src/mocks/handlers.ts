import { http, HttpResponse } from 'msw'

export type Template = {
  id: string
  title: string
  description: string
  color: string
  donationAmounts: number[]
  category: 'wedding' | 'baby' | 'fundraiser' | 'memorial'
}

export type GenerateCollectionResponse = {
  templates: Template[]
  feedback: string
  generatedAt: number
}

const templates: Record<string, Template[]> = {
  wedding: [
    {
      id: 'wedding-1',
      title: 'Wedding Gift Registry',
      description: 'Collect gifts from guests for your wedding',
      color: '#fce7f3',
      donationAmounts: [25, 50, 100, 200],
      category: 'wedding',
    },
    {
      id: 'wedding-2',
      title: 'Honeymoon Fund',
      description: 'Help fund your dream honeymoon',
      color: '#fef3c7',
      donationAmounts: [50, 100, 250, 500],
      category: 'wedding',
    },
  ],
  baby: [
    {
      id: 'baby-1',
      title: 'Baby Shower Collection',
      description: 'Celebrate the arrival of your baby',
      color: '#dbeafe',
      donationAmounts: [10, 25, 50, 100],
      category: 'baby',
    },
    {
      id: 'baby-2',
      title: 'New Baby Essentials',
      description: 'Help with supplies for your new arrival',
      color: '#dcfce7',
      donationAmounts: [15, 30, 75, 150],
      category: 'baby',
    },
  ],
  fundraiser: [
    {
      id: 'fundraiser-1',
      title: 'Community Fundraiser',
      description: 'Raise funds for a great cause',
      color: '#fed7aa',
      donationAmounts: [10, 25, 50, 100],
      category: 'fundraiser',
    },
  ],
  memorial: [
    {
      id: 'memorial-1',
      title: 'Memorial Collection',
      description: 'Honor the memory of a loved one',
      color: '#e5e7eb',
      donationAmounts: [25, 50, 100, 250],
      category: 'memorial',
    },
  ],
}

function detectCategory(prompt: string): keyof typeof templates {
  const lower = prompt.toLowerCase()
  
  // Check for specific collection types
  if (lower.includes('wedding') || lower.includes('bride') || lower.includes('groom')) {
    return 'wedding'
  }
  if (lower.includes('baby') || lower.includes('shower') || lower.includes('pregnant') || lower.includes('group gift')) {
    return 'baby'
  }
  if (lower.includes('fundraiser') || lower.includes('raise') || lower.includes('donation') || lower.includes('flat donation') || lower.includes('product sale') || lower.includes('athon')) {
    return 'fundraiser'
  }
  if (lower.includes('memorial') || lower.includes('tribute')) {
    return 'memorial'
  }
  
  return 'wedding'
}

export const handlers = [
  http.post('/api/ai/generate-collection', async ({ request }) => {
    const body = (await request.json()) as { userPrompt: string; category?: string }

    // Simulate error on specific keywords
    if (body.userPrompt.toLowerCase().includes('error') || body.userPrompt.toLowerCase().includes('fail')) {
      // Simulate 2-second delay with error
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return new HttpResponse(
        JSON.stringify({ message: 'Simulated server error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const category = (body.category as keyof typeof templates) || detectCategory(body.userPrompt)
    const categoryTemplates = templates[category] || templates.wedding

    // Simulate network latency (1.5-2.5 seconds)
    const delay = 1500 + Math.random() * 1000
    await new Promise((resolve) => setTimeout(resolve, Math.floor(delay)))

    const response: GenerateCollectionResponse = {
      templates: categoryTemplates,
      feedback: `Here's a ${category} collection suggestion based on your request`,
      generatedAt: Date.now(),
    }

    return new HttpResponse(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }),
]
