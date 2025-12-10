import { Suspense, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { InputStep } from '@/components/InputStep'
import { PreviewStep } from '@/components/PreviewStep'
import { ConfirmStep } from '@/components/ConfirmStep'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useGenerateCollection } from '@/hooks/useGenerateCollection'
import type { Template } from '@/mocks/handlers'

interface WizardState {
  currentStep: 'input' | 'preview' | 'confirm'
  userPrompt: string
  selectedTemplate?: Template
}

export function Wizard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mutation = useGenerateCollection()

  // Parse URL state
  const currentStep = (searchParams.get('step') || 'input') as WizardState['currentStep']
  const userPrompt = searchParams.get('prompt') || ''
  const selectedTemplateId = searchParams.get('templateId')

  // Find selected template
  const selectedTemplate = useMemo(() => {
    if (!selectedTemplateId || !mutation.data) return undefined
    return mutation.data.templates.find((t) => t.id === selectedTemplateId)
  }, [selectedTemplateId, mutation.data])

  // Handle step transitions
  const goToStep = (step: WizardState['currentStep'], state?: Record<string, string>) => {
    const newParams = new URLSearchParams()
    newParams.set('step', step)
    if (state) {
      Object.entries(state).forEach(([key, value]) => {
        newParams.set(key, value)
      })
    }
    setSearchParams(newParams)

    // Focus management for accessibility
    const mainEl = document.querySelector('main')
    mainEl?.focus()
  }

  const handleInputSubmit = (prompt: string) => {
    mutation.mutate(
      { userPrompt: prompt },
      {
        onSuccess: () => {
          goToStep('preview', { prompt })
        },
      }
    )
  }

  const handleSelectTemplate = (templateId: string) => {
    goToStep('confirm', { prompt: userPrompt, templateId })
  }

  const handleConfirm = () => {
    // In a real app, this would submit to a backend
    alert(`Collection "${selectedTemplate?.title}" created successfully!`)
    goToStep('input')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with back button and theme toggle */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <button className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-semibold text-sm hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
              ← Back to Dashboard
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight tracking-tight">
              What would you like to build today?
            </h1>
          </motion.div>

          {/* Wizard steps - only shown for preview/confirm */}
          {currentStep !== 'input' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className=""
            >
              {/* Step content with animation */}
              <AnimatePresence mode="wait">
              {currentStep === 'preview' && (
                <Suspense
                  fallback={
                    <div className="py-12 text-center text-neutral-600">Loading...</div>
                  }
                >
                  <PreviewStep
                    key="preview"
                    templates={mutation.data?.templates}
                    selectedTemplateId={selectedTemplateId || undefined}
                    onSelect={handleSelectTemplate}
                    isLoading={mutation.isPending}
                    isError={mutation.isError}
                    error={mutation.error}
                    onRetry={() => mutation.mutate({ userPrompt })}
                    feedback={mutation.data?.feedback}
                    collectionType={userPrompt}
                    onBack={() => goToStep('input')}
                    onGenerateAI={(aiPrompt) => {
                      mutation.mutate(
                        { userPrompt: aiPrompt },
                        {
                          onSuccess: () => {
                            goToStep('preview', { prompt: aiPrompt })
                          },
                        }
                      )
                    }}
                  />
                </Suspense>
              )}

              {currentStep === 'confirm' && (
                <Suspense
                  fallback={
                    <div className="py-12 text-center text-neutral-600">Loading...</div>
                  }
                >
                  <ConfirmStep
                    key="confirm"
                    template={selectedTemplate}
                    onConfirm={handleConfirm}
                    onEdit={() => goToStep('preview', { prompt: userPrompt })}
                  />
                </Suspense>
              )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Input step - full width */}
          {currentStep === 'input' && (
            <Suspense
              fallback={
                <div className="py-12 text-center text-neutral-600">Loading...</div>
              }
            >
              <InputStep
                key="input"
                onSubmit={handleInputSubmit}
                isLoading={mutation.isPending}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
