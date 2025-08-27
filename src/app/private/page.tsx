import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to your private page!</CardTitle>
              <CardDescription>
                This page is only accessible to authenticated users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Your email:</p>
                <p className="font-medium">{data.user.email}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">User ID:</p>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {data.user.id}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Account created:</p>
                <p className="font-medium">
                  {new Date(data.user.created_at).toLocaleDateString()}
                </p>
              </div>

              <form>
                <Button formAction={signOut} variant="outline" className="w-full">
                  Sign Out
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
