"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postJob } from "@/app/post-job/actions";
import type { JobPostData } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";
import { buttonVariants } from "./page-transition";
import { CheckCircle2, Loader2 } from "lucide-react";

export function JobPostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<JobPostData>({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    salary_min: undefined,
    salary_max: undefined,
    description: "",
    requirements: [],
    application_url: "",
    contact_email: "",
  });
  const [requirementsInput, setRequirementsInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "salary_min" || name === "salary_max") {
      setFormData(prev => ({
        ...prev,
        [name]: value ? Number(value) : undefined,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRequirementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRequirementsInput(value);
    
    // Split by newlines and filter out empty strings
    const requirementsArray = value
      .split('\n')
      .map(req => req.trim())
      .filter(req => req.length > 0);
    
    setFormData(prev => ({
      ...prev,
      requirements: requirementsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.title.trim() || !formData.company.trim() || !formData.location.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.salary_min && formData.salary_max && formData.salary_min > formData.salary_max) {
      setError("Minimum salary cannot be greater than maximum salary");
      return;
    }

    startTransition(async () => {
      try {
        await postJob(formData);
        setIsSuccess(true);
        // Delay before redirect to show success animation
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to post job");
      }
    });
  };

  // Success state animation
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 200, 
                damping: 10 
              }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Job Posted Successfully!
            </motion.h3>
            <motion.p 
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Your job posting is now live. Redirecting to jobs page...
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting...
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="p-4 bg-red-50 border border-red-200 rounded-md"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-red-800 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

          {/* Basic Information */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="space-y-2"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Software Engineer"
                required
                disabled={isPending}
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. TechCorp Inc."
                required
                disabled={isPending}
              />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. San Francisco, CA or Remote"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Salary Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Minimum Salary (USD, optional)</Label>
              <Input
                id="salary_min"
                name="salary_min"
                type="number"
                value={formData.salary_min || ""}
                onChange={handleInputChange}
                placeholder="e.g. 80000"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_max">Maximum Salary (USD, optional)</Label>
              <Input
                id="salary_max"
                name="salary_max"
                type="number"
                value={formData.salary_max || ""}
                onChange={handleInputChange}
                placeholder="e.g. 120000"
                min="0"
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
              required
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (optional)</Label>
            <textarea
              id="requirements"
              value={requirementsInput}
              onChange={handleRequirementsChange}
              rows={4}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter each requirement on a new line, e.g.:&#10;3+ years of experience&#10;React and TypeScript&#10;Strong communication skills"
            />
            <p className="text-xs text-muted-foreground">
              Enter each requirement on a new line
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="application_url">Application URL (optional)</Label>
              <Input
                id="application_url"
                name="application_url"
                type="url"
                value={formData.application_url}
                onChange={handleInputChange}
                placeholder="https://company.com/apply"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email (optional)</Label>
              <Input
                id="contact_email"
                name="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={handleInputChange}
                placeholder="hiring@company.com"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.div 
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="flex-1"
              variants={buttonVariants}
              whileHover={!isPending ? "hover" : undefined}
              whileTap={!isPending ? "tap" : undefined}
            >
              <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Posting Job...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      Post Job
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover={!isPending ? "hover" : undefined}
              whileTap={!isPending ? "tap" : undefined}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
    </motion.div>
  );
}
