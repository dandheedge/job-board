-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  posted_date DATE DEFAULT CURRENT_DATE,
  application_url VARCHAR(500),
  contact_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on title and company for search
CREATE INDEX IF NOT EXISTS idx_jobs_search ON jobs USING gin(to_tsvector('english', title || ' ' || company));

-- Create an index on location
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);

-- Create an index on type
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);

-- Create an index on posted_date
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs(posted_date DESC);

-- Create an index on user_id
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);

-- Insert sample jobs
INSERT INTO jobs (title, company, location, type, salary_min, salary_max, description, requirements, application_url, contact_email) VALUES
  (
    'Senior Full Stack Developer',
    'TechCorp Inc.',
    'San Francisco, CA',
    'full-time',
    120000,
    180000,
    'We are looking for a Senior Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
    ARRAY['5+ years of experience', 'React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    'https://techcorp.com/apply/senior-fullstack',
    'hiring@techcorp.com'
  ),
  (
    'Frontend Developer',
    'StartupXYZ',
    'New York, NY',
    'full-time',
    80000,
    120000,
    'Join our innovative startup as a Frontend Developer. You will work on creating beautiful and intuitive user interfaces for our web applications.',
    ARRAY['3+ years of experience', 'React', 'CSS', 'JavaScript', 'Git'],
    'https://startupxyz.com/careers/frontend-dev',
    'jobs@startupxyz.com'
  ),
  (
    'Backend Engineer',
    'DataSolutions Ltd.',
    'Austin, TX',
    'full-time',
    100000,
    150000,
    'We need a skilled Backend Engineer to design and implement scalable backend systems and APIs.',
    ARRAY['4+ years of experience', 'Python', 'Django', 'PostgreSQL', 'AWS'],
    'https://datasolutions.com/apply',
    'careers@datasolutions.com'
  ),
  (
    'Software Engineering Intern',
    'BigTech Corp',
    'Seattle, WA',
    'internship',
    25,
    35,
    'Summer internship program for computer science students. Work alongside senior engineers on real projects.',
    ARRAY['Currently enrolled in CS program', 'Basic programming knowledge', 'Git', 'Problem solving skills'],
    'https://bigtech.com/internships',
    'internships@bigtech.com'
  ),
  (
    'React Developer',
    'WebAgency Pro',
    'Remote',
    'contract',
    50,
    80,
    'Contract position for an experienced React developer to work on client projects. Flexible hours and remote work.',
    ARRAY['3+ years React experience', 'Redux', 'TypeScript', 'REST APIs', 'Remote work experience'],
    'https://webagency.com/contractors',
    'contracts@webagency.com'
  );

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for job access
-- Allow everyone to read jobs (for public job board)
CREATE POLICY "Anyone can view jobs" ON jobs FOR SELECT USING (true);

-- Allow authenticated users to insert jobs (they become the owner)
CREATE POLICY "Authenticated users can insert jobs" ON jobs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update and delete their own jobs
CREATE POLICY "Users can update their own jobs" ON jobs FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs" ON jobs FOR DELETE 
USING (auth.uid() = user_id);
