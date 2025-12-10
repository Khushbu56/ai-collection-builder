import { motion } from 'framer-motion'
import { AlertCircle, RotateCcw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Unable to generate templates. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-lg border border-red-200 bg-red-50 p-6"
      role="alert"
    >
      <div className="flex gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-2">{title}</h3>
          <p className="text-sm text-red-800 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              aria-label="Retry generating templates"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
