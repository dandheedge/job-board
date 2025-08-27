'use server'

import { createClient } from '@/lib/supabase/server'
import { JobPostData } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function postJob(data: JobPostData) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('You must be logged in to post a job')
  }

  // Insert the job with the authenticated user's ID
  const { data: job, error } = await supabase
    .from('jobs')
    .insert({
      ...data,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to post job: ${error.message}`)
  }

  // Revalidate the jobs page to show the new job
  revalidatePath('/')
  revalidatePath('/jobs')
  
  // Redirect to the new job page
  redirect(`/jobs/${job.id}`)
}

export async function deleteJob(jobId: string) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('You must be logged in to delete a job')
  }

  // Delete the job (RLS policy will ensure only the owner can delete)
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(`Failed to delete job: ${error.message}`)
  }

  // Revalidate the jobs page
  revalidatePath('/')
  revalidatePath('/jobs')
  
  redirect('/')
}

export async function updateJob(jobId: string, data: Partial<JobPostData>) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('You must be logged in to update a job')
  }

  // Update the job (RLS policy will ensure only the owner can update)
  const { data: job, error } = await supabase
    .from('jobs')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', jobId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update job: ${error.message}`)
  }

  // Revalidate the jobs page
  revalidatePath('/')
  revalidatePath('/jobs')
  revalidatePath(`/jobs/${jobId}`)
  
  return job
}
