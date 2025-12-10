import { motion } from 'framer-motion'

export function LoadingSpinner() {
  // Animated cube design matching the Figma prototype
  const cubeVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
    animate: (i: number) => ({
      rotateX: [0, 360],
      rotateY: [0, 360],
      rotateZ: [0, 360],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: 'linear',
      },
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20 space-y-8"
    >
      {/* Animated 3D Cube Icon */}
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Yellow top face */}
        <motion.div
          className="absolute w-20 h-20 bg-yellow-400 rounded-xl"
          style={{
            top: 0,
            left: 4,
            transformStyle: 'preserve-3d',
          }}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Orange left face */}
        <motion.div
          className="absolute w-20 h-20 bg-orange-500 rounded-xl opacity-90"
          style={{
            top: 8,
            left: -2,
            transformStyle: 'preserve-3d',
          }}
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Teal right face */}
        <motion.div
          className="absolute w-20 h-20 bg-teal-400 rounded-xl opacity-90"
          style={{
            top: 8,
            left: 14,
            transformStyle: 'preserve-3d',
          }}
          animate={{ x: [2, -2, 2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading text with animation */}
      <motion.div
        className="text-center space-y-2"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-xl font-semibold text-neutral-900 dark:text-white">
          Generating templates...
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Let AI suggest the perfect template
        </p>
      </motion.div>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-orange-500 rounded-full"
            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
    >
      <motion.div
        className="h-24 rounded-md mb-4 bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600"
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      />
      <motion.div
        className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-3/4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-6 w-12 bg-neutral-200 dark:bg-neutral-700 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
