import { motion } from 'framer-motion'
import type { Template } from '@/mocks/handlers'

interface CollectionCardProps {
  template: Template
  onSelect: (id: string) => void
  isSelected?: boolean
}

export function CollectionCard({ template, onSelect, isSelected }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => onSelect(template.id)}
        className={`w-full text-left rounded-2xl p-6 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          isSelected
            ? 'ring-3 ring-primary-600 bg-primary-50 border-2 border-primary-600'
            : 'border-2 border-neutral-200 bg-white hover:shadow-xl hover:border-primary-300 hover:scale-105'
        }`}
        aria-pressed={isSelected}
        aria-label={`${template.title}, suggested donations: ${template.donationAmounts.join(', ')}`}
      >
        {/* Color preview */}
        <div
          className="h-32 rounded-xl mb-5 shadow-md"
          style={{ backgroundColor: template.color }}
          aria-hidden
        />

        {/* Content */}
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{template.title}</h3>
        <p className="text-base text-neutral-600 mb-5 line-clamp-2">{template.description}</p>

        {/* Suggested amounts */}
        <div className="flex gap-3 flex-wrap mb-4">
          {template.donationAmounts.map((amount) => (
            <span
              key={amount}
              className="text-sm font-semibold px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200"
            >
              ${amount}
            </span>
          ))}
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex items-center gap-2 text-primary-600 font-bold"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base">Selected</span>
          </motion.div>
        )}
      </button>
    </motion.div>
  )
}
