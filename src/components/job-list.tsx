'use client'

import type { Job } from '@/lib/types'
import { JobCard } from './job-card'
import { motion, AnimatePresence } from 'motion/react'
import { listVariants, LoadingSpinner } from './page-transition'

interface JobListProps {
  jobs: Job[]
  loading?: boolean
}

export function JobList({ jobs, loading = false }: JobListProps) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (jobs.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3 
          className="text-lg font-semibold text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No jobs found
        </motion.h3>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Try adjusting your search criteria
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="space-y-4"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
