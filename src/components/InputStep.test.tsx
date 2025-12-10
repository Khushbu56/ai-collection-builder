import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { InputStep } from '@/components/InputStep'

const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  )
}

describe('InputStep', () => {
  it('renders collection types', () => {
    const mockSubmit = vi.fn()
    render(<InputStep onSubmit={mockSubmit} />, { wrapper: createWrapper() })

    expect(screen.getByText('Online Shop')).toBeInTheDocument()
    expect(screen.getByText('Group Gifts')).toBeInTheDocument()
    expect(screen.getByText('Forms')).toBeInTheDocument()
  })

  it('renders fundraiser types', () => {
    const mockSubmit = vi.fn()
    render(<InputStep onSubmit={mockSubmit} />, { wrapper: createWrapper() })

    expect(screen.getByText('Flat Donations')).toBeInTheDocument()
    expect(screen.getByText('Product Sales')).toBeInTheDocument()
  })

  it('submits with collection type on click', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()
    render(<InputStep onSubmit={mockSubmit} />, { wrapper: createWrapper() })

    const groupGiftsButton = screen.getByRole('button', { name: /Group Gifts/i })
    await user.click(groupGiftsButton)

    expect(mockSubmit).toHaveBeenCalledWith('Group Gifts')
  })

  it('submits with fundraiser type on click', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()
    render(<InputStep onSubmit={mockSubmit} />, { wrapper: createWrapper() })

    const flatDonationsButton = screen.getByRole('button', { name: /Flat Donations/i })
    await user.click(flatDonationsButton)

    expect(mockSubmit).toHaveBeenCalledWith('Flat Donations')
  })

  it('disables buttons when loading', () => {
    const mockSubmit = vi.fn()
    render(<InputStep onSubmit={mockSubmit} isLoading={true} />, { wrapper: createWrapper() })

    // Get first collection type button (Online Shop)
    const onlineShopBtn = screen.getByRole('button', { name: /Online Shop/i })
    expect(onlineShopBtn).toHaveAttribute('disabled')
  })
})
