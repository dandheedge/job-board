'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Briefcase, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Navigation() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: pathname === '/' ? 360 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Briefcase className="h-6 w-6" />
              </motion.div>
              <span className="font-bold text-xl">JobBoard</span>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8 relative">
            {[
              { href: '/', label: 'Jobs' },
              { href: '/about', label: 'About' },
              ...(user ? [
                { href: '/private', label: 'Dashboard' },
                { href: '/post-job', label: 'Post a Job' }
              ] : [])
            ].map((link) => (
              <motion.div key={link.href} className="relative">
                <Link 
                  href={link.href}
                  className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${
                    pathname === link.href 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-muted rounded-md"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={handleSignOut} variant="outline" size="sm">
                    Sign Out
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild>
                    <Link href="/post-job">Post a Job</Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
