import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { JobPostForm } from '@/components/job-post-form'

export default async function PostJobPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login?redirect=/post-job')
  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Post a Job
            </h1>
            <p className="text-muted-foreground">
              Connect with talented professionals and find your next great hire
            </p>
          </div>

          <JobPostForm />
        </div>
      </main>
    </div>
  )
}