'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, MapPin, Building2, DollarSign, Calendar, ExternalLink, Mail } from 'lucide-react'
import type { Job } from '@/lib/types'
import { motion } from 'motion/react'
import { buttonVariants } from '@/components/page-transition'

interface JobDetailClientProps {
  job: Job
}

export function JobDetailClient({ job }: JobDetailClientProps) {
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Jobs
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Job Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CardTitle className="text-3xl">{job.title}</CardTitle>
                      </motion.div>
                      
                      <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </motion.div>
                        
                        {salary && (
                          <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <DollarSign className="h-4 w-4" />
                            <span>{salary}</span>
                          </motion.div>
                        )}
                        
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Posted {new Date(job.posted_date).toLocaleDateString()}</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <Badge variant={getTypeColor(job.type)} className="text-sm">
                        {job.type.replace('-', ' ')}
                      </Badge>
                    </motion.div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground">
                        {job.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, index) => (
                          <motion.li 
                            key={`requirement-${requirement.slice(0, 20)}-${index}`} 
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                          > 
                            <motion.div 
                              className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                              viewport={{ once: true }}
                            />
                            <span className="text-muted-foreground">{requirement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for this Job</CardTitle>
                    <CardDescription>
                      Ready to take the next step in your career?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {job.application_url && (
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button asChild className="w-full">
                          <a 
                            href={job.application_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Apply Online
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    
                    {job.contact_email && (
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button variant="outline" asChild className="w-full">
                          <a 
                            href={`mailto:${job.contact_email}?subject=Application for ${job.title}`}
                            className="flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" />
                            Email Directly
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Job Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <motion.div 
                        className="flex justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-muted-foreground">Job Type</span>
                        <Badge variant={getTypeColor(job.type)}>
                          {job.type.replace('-', ' ')}
                        </Badge>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="flex justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-muted-foreground">Company</span>
                        <span className="font-medium">{job.company}</span>
                      </motion.div>
                      
                      <Separator />
                      
                      <motion.div 
                        className="flex justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">{job.location}</span>
                      </motion.div>
                      
                      {salary && (
                        <>
                          <Separator />
                          <motion.div 
                            className="flex justify-between"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <span className="text-muted-foreground">Salary</span>
                            <span className="font-medium">{salary}</span>
                          </motion.div>
                        </>
                      )}
                      
                      <Separator />
                      
                      <motion.div 
                        className="flex justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-muted-foreground">Posted</span>
                        <span className="font-medium">
                          {new Date(job.posted_date).toLocaleDateString()}
                        </span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
