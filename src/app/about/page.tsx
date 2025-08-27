import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              About JobBoard
            </h1>
            <p className="text-xl text-muted-foreground">
              Connecting talented individuals with amazing opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe that finding the right job should be simple and accessible to everyone. 
                  Our platform connects job seekers with employers, creating meaningful professional relationships.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Job Seekers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse thousands of job opportunities, filter by your preferences, 
                  and apply directly to positions that match your skills and career goals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Employers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Post your job openings and reach qualified candidates. 
                  Our platform makes it easy to manage applications and find the perfect fit for your team.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ready to find your next opportunity or hire top talent? 
                  Browse our job listings or post a new position today.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
