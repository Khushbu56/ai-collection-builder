import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'

const SUGGESTIONS = ['Christmas', 'Baby Shower', 'Retirement', 'Staff Giving']

interface AICreatorFormProps {
  onBack: () => void
  onSubmit: (prompt: string) => void
  collectionType?: string
}

export function AICreatorForm({ onBack, onSubmit, collectionType }: AICreatorFormProps) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Hi Molly, I'll help you get started!
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Tell us about the {(collectionType || 'group gift').toLowerCase()} you're collecting for:
          </p>
        </div>

        {/* Input field */}
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={`I'm collecting a ${(collectionType || 'group gift').toLowerCase()} for...`}
            className="w-full px-6 py-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Popular suggestions:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium rounded-full hover:bg-teal-200 dark:hover:bg-teal-900/50 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="px-8 py-3 bg-teal-600 dark:bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Generate Templates
        </button>
      </div>
    </motion.div>
  )
}
