import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Job } from '@/lib/types'
import { JobDetailClient } from '@/app/jobs/[id]/job-detail-client'

interface JobDetailPageProps {
  params: { id: string }
}

async function getJob(id: string): Promise<Job | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data as Job
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  return <JobDetailClient job={job} />
}
