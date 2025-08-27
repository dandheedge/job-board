export interface Job {
  id: string
  user_id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  salary_min?: number
  salary_max?: number
  description: string
  requirements: string[]
  posted_date: string
  application_url?: string
  contact_email?: string
  created_at: string
  updated_at: string
}

export interface JobWithUser extends Job {
  user_email?: string
  user_name?: string
}

export interface JobFilters {
  search?: string
  location?: string
  type?: Job['type']
  salary_min?: number
}

export interface JobPostData {
  title: string
  company: string
  location: string
  type: Job['type']
  salary_min?: number
  salary_max?: number
  description: string
  requirements: string[]
  application_url?: string
  contact_email?: string
}
