'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Search, MapPin, Briefcase, X } from 'lucide-react'
import { JobFilters } from '@/lib/types'

interface JobSearchProps {
  onFiltersChange: (filters: JobFilters) => void
  initialFilters?: JobFilters
}

export function JobSearch({ onFiltersChange, initialFilters = {} }: JobSearchProps) {
  const [filters, setFilters] = useState<JobFilters>(initialFilters)

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ] as const

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value || undefined }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleLocationChange = (value: string) => {
    const newFilters = { ...filters, location: value || undefined }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleTypeToggle = (type: string) => {
    const newFilters = { 
      ...filters, 
      type: filters.type === type ? undefined : type as any 
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {}
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = Object.keys(filters).some(key => filters[key as keyof JobFilters])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title, company, or keywords..."
                value={filters.search || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location..."
                value={filters.location || ''}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Job Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Job Type</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map((type) => (
                <Badge
                  key={type.value}
                  variant={filters.type === type.value ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => handleTypeToggle(type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
