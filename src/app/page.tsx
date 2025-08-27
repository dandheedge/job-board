"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { JobList } from "@/components/job-list";
import { JobSearch } from "@/components/job-search";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Job, JobFilters } from "@/lib/types";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({});
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  const fetchJobs = useCallback(async (currentFilters: JobFilters) => {
    setLoading(true);

    let query = supabase
      .from("jobs")
      .select("*")
      .order("posted_date", { ascending: false });

    // Apply search filter
    if (currentFilters.search) {
      query = query.or(
        `title.ilike.%${currentFilters.search}%,company.ilike.%${currentFilters.search}%,description.ilike.%${currentFilters.search}%`,
      );
    }

    // Apply location filter
    if (currentFilters.location) {
      query = query.ilike("location", `%${currentFilters.location}%`);
    }

    // Apply type filter
    if (currentFilters.type) {
      query = query.eq("type", currentFilters.type);
    }

    // Apply salary filter
    if (currentFilters.salary_min) {
      query = query.gte("salary_min", currentFilters.salary_min);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchJobs(filters);
  }, [filters, fetchJobs]);

  // Check authentication status
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleFiltersChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover amazing opportunities with top companies. Start your
              career journey today.
            </p>
            
            {/* Auth CTA - Only show if user is not logged in */}
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex gap-3">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join thousands of job seekers finding their perfect match
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <JobSearch
                  onFiltersChange={handleFiltersChange}
                  initialFilters={filters}
                />
              </div>
            </div>

            {/* Job Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {loading ? "Loading jobs..." : `${jobs.length} jobs found`}
                </h2>
                {Object.keys(filters).length > 0 && (
                  <p className="text-muted-foreground">
                    Showing results for your search criteria
                  </p>
                )}
              </div>

              <JobList jobs={jobs} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
