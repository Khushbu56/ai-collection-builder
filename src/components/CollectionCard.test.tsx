import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CollectionCard } from '@/components/CollectionCard'

const mockTemplate = {
  id: 'test-1',
  title: 'Wedding Gift Registry',
  description: 'Collect gifts from guests',
  color: '#fce7f3',
  donationAmounts: [25, 50, 100, 200],
  category: 'wedding' as const,
}

describe('CollectionCard', () => {
  it('renders template information', () => {
    const mockSelect = vi.fn()
    render(<CollectionCard template={mockTemplate} onSelect={mockSelect} />)

    expect(screen.getByText('Wedding Gift Registry')).toBeInTheDocument()
    expect(screen.getByText('Collect gifts from guests')).toBeInTheDocument()
  })

  it('displays suggested donation amounts', () => {
    const mockSelect = vi.fn()
    render(<CollectionCard template={mockTemplate} onSelect={mockSelect} />)

    expect(screen.getByText('$25')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  it('calls onSelect with template id when clicked', () => {
    const mockSelect = vi.fn()
    render(<CollectionCard template={mockTemplate} onSelect={mockSelect} />)

    const button = screen.getByRole('button')
    button.click()

    expect(mockSelect).toHaveBeenCalledWith('test-1')
  })

  it('shows selected state when isSelected is true', () => {
    const mockSelect = vi.fn()
    render(<CollectionCard template={mockTemplate} onSelect={mockSelect} isSelected={true} />)

    expect(screen.getByText('Selected')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })
})
