import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import type { Template } from '@/mocks/handlers'

interface ConfirmStepProps {
  template?: Template
  onConfirm?: () => void
  onEdit?: () => void
  isSubmitting?: boolean
}

export function ConfirmStep({
  template,
  onConfirm,
  onEdit,
  isSubmitting,
}: ConfirmStepProps) {
  if (!template) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-neutral-600">No template selected</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Back button */}
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold text-sm hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {/* Centered content */}
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Template preview with image */}
        <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div
            className="h-64 w-full"
            style={{ backgroundColor: template.color }}
            aria-hidden
          />
          <div className="p-8 bg-white dark:bg-neutral-800">
            <h1 className="text-4xl sm:text-5xl font-serif text-neutral-900 dark:text-neutral-50 mb-4">
              {template.title}
            </h1>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">{template.description}</p>
          </div>
        </div>

        {/* Donation amounts */}
        <div className="p-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          <div className="flex gap-3 flex-wrap justify-center">
            {template.donationAmounts.map((amount) => (
              <span
                key={amount}
                className="text-lg font-semibold px-4 py-2 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-600"
              >
                ${amount}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            disabled={isSubmitting}
            className="px-8 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-semibold rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-50 transition"
          >
            Preview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-8 py-3 bg-orange-500 dark:bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? 'Creating...' : 'Try this out'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
