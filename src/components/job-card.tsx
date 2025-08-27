'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Building2, DollarSign } from 'lucide-react'
import type { Job } from '@/lib/types'
import { motion } from 'motion/react'
import { cardVariants, buttonVariants, itemVariants } from './page-transition'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    }
    if (min) return `$${min.toLocaleString()}+`
    return `Up to $${max?.toLocaleString()}`
  }

  const getTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'full-time':
        return 'default'
      case 'part-time':
        return 'secondary'
      case 'contract':
        return 'outline'
      case 'internship':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const salary = formatSalary(job.salary_min, job.salary_max)

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        className="h-full"
      >
        <Card className="w-full h-full transition-shadow duration-300 border hover:border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Building2 className="h-4 w-4" />
                  <span>{job.company}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </motion.div>
                
                {salary && (
                  <motion.div 
                    className="flex items-center gap-2 text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>{salary}</span>
                  </motion.div>
                )}
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Badge variant={getTypeColor(job.type)}>
                  {job.type.replace('-', ' ')}
                </Badge>
              </motion.div>
            </div>
          </CardHeader>
          
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardDescription className="mb-4 line-clamp-3">
                {job.description}
              </CardDescription>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm text-muted-foreground">
                Posted {new Date(job.posted_date).toLocaleDateString()}
              </span>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link href={`/jobs/${job.id}`}>
                  <Button className="transition-all duration-200">
                    View Details
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
