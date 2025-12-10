import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { LoadingSpinner } from './LoadingState'
import { ErrorState } from './ErrorState'
import { AICreatorForm } from './AICreatorForm'
import type { Template } from '@/mocks/handlers'

interface PreviewStepProps {
  templates?: Template[]
  selectedTemplateId?: string
  onSelect: (id: string) => void
  isLoading?: boolean
  isError?: boolean
  error?: Error | null
  onRetry?: () => void
  feedback?: string
  collectionType?: string
  onBack?: () => void
  onGenerateAI?: (prompt: string) => void
}

export function PreviewStep({
  templates,
  selectedTemplateId,
  onSelect,
  isLoading,
  isError,
  error,
  onRetry,
  feedback,
  collectionType,
  onBack,
  onGenerateAI,
}: PreviewStepProps) {
  const [showAIForm, setShowAIForm] = useState(false)
  const [aiPrompt, setAiPrompt] = useState<string | null>(null)

  // If showing AI form, render that instead
  if (showAIForm) {
    return (
      <AICreatorForm
        onBack={() => setShowAIForm(false)}
        onSubmit={(prompt) => {
          setShowAIForm(false)
          setAiPrompt(prompt)
          // Call the AI generation handler
          if (prompt.trim() && onGenerateAI) {
            onGenerateAI(prompt)
          }
        }}
        collectionType={collectionType}
      />
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
      </div>

      {/* Page title and description */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
          Collection: {collectionType || 'Group Gifts'}
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Collecting money for {(collectionType || 'group gift').toLowerCase()} is now easier than ever. Jump start your collection from the options below:
        </p>
      </div>

      {/* Two column layout: Create from scratch vs AI Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create from scratch card */}
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 bg-white dark:bg-neutral-800">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Create from scratch</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            You can jump right in and start building your collection from scratch. Customize it exactly how you like!
          </p>
          <button className="px-6 py-3 bg-orange-500 dark:bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition">
            Get Started
          </button>
        </div>

        {/* Use AI to create card */}
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 bg-white dark:bg-neutral-800">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Use AI to create ✨</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Use our super cool new AI builder that can create a layout for you or recommend existing templates
          </p>
          <button
            onClick={() => setShowAIForm(true)}
            className="px-6 py-3 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold rounded-lg hover:bg-teal-200 dark:hover:bg-teal-900/50 transition"
          >
            Try AI Creator
          </button>
        </div>
      </div>

      {/* CREATE FROM SCRATCH section */}
      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-12">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-8 tracking-wide uppercase">
          CREATE FROM SCRATCH
        </h2>

        {/* Feedback message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg mb-8"
          >
            <p className="text-sm text-orange-900 dark:text-orange-200">{feedback}</p>
          </motion.div>
        )}

        {/* Loading state */}
        <AnimatePresence mode="wait">
          {isLoading && <LoadingSpinner key="loading" />}

          {/* Error state */}
          {isError && !isLoading && (
            <ErrorState
              key="error"
              title="Failed to generate templates"
              message={error?.message || 'Please try again'}
              onRetry={onRetry}
            />
          )}

          {/* Templates grid */}
          {!isLoading && !isError && templates && templates.length > 0 && (
            <div key="templates" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -4 }}
                    className="cursor-pointer group"
                    onClick={() => onSelect(template.id)}
                  >
                    {/* Preview image */}
                    <div
                      className="w-full h-40 rounded-lg mb-4 group-hover:shadow-md dark:group-hover:shadow-lg transition-all border-2 border-transparent group-hover:border-neutral-300 dark:group-hover:border-neutral-600"
                      style={{
                        backgroundColor: template.color,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    {/* Template info */}
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-50">{template.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{template.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {!isLoading && !isError && (!templates || templates.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-neutral-600">No templates found. Try adjusting your search.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
