# Job Board Application

A modern job board application built with Next.js 15, Supabase, Tailwind CSS, and shadcn/ui components.

## Features

- 🔍 **Job Search & Filtering** - Search jobs by title, company, location, and type
- 👤 **User Authentication** - Sign up, sign in, and user sessions with Supabase Auth
- 📱 **Responsive Design** - Mobile-first design using Tailwind CSS
- 🎨 **Modern UI** - Beautiful components with shadcn/ui
- 🗄️ **Database Integration** - PostgreSQL database with Supabase
- ⚡ **Server-Side Rendering** - Fast loading with Next.js App Router

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use `nvm use lts/jod`)
- A Supabase account

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd job-board
```

### 2. Install dependencies

```bash
nvm use lts/jod  # Use the correct Node.js version
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the database

1. Go to your Supabase dashboard → SQL Editor
2. Run the SQL commands from `src/lib/database.sql` to create the jobs table and sample data

### 5. Configure email templates (Optional)

For email confirmation to work properly:

1. Go to Authentication → Email Templates in your Supabase dashboard
2. Edit the "Confirm signup" template
3. Change `{{ .ConfirmationURL }}` to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Authentication pages
│   ├── jobs/[id]/         # Individual job pages
│   ├── about/             # About page
│   ├── post-job/          # Job posting page
│   └── private/           # Protected user dashboard
├── components/            # Reusable React components
│   ├── ui/                # shadcn/ui components
│   ├── job-card.tsx       # Job listing card
│   ├── job-list.tsx       # Job listings container
│   ├── job-search.tsx     # Search and filter component
│   └── navigation.tsx     # Header navigation
├── lib/                   # Utility functions and types
│   ├── supabase/          # Supabase client configurations
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # shadcn/ui utilities
│   └── database.sql       # Database schema and sample data
└── middleware.ts          # Auth middleware
```

## Key Features Explained

### Authentication

The app uses Supabase Auth with server-side rendering:

- **Login/Signup:** Forms with server actions
- **Email Confirmation:** Automatic email verification
- **Protected Routes:** Middleware protects `/private` routes
- **Session Management:** Automatic token refresh

### Job Search

- **Real-time Search:** Filter by job title, company, and description
- **Location Filter:** Search by job location
- **Job Type Filter:** Filter by full-time, part-time, contract, internship
- **Responsive Design:** Works on all device sizes

### Database Schema

The jobs table includes:
- Basic job information (title, company, location)
- Job details (description, requirements, salary range)
- Application information (URL, contact email)
- Metadata (posting date, job type)

## Future Enhancements

If I have enough time, I plan to implement these additional features:

- 🎨 **Enhanced UI/UX** - Make the interface more polished and intuitive with improved animations and user experience
- 🔍 **Advanced Search** - Implement indexing and Elasticsearch for faster, more sophisticated job search capabilities
- 👤 **User Profiles** - Add profile pictures and implement a verification system for users to build trust and credibility

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

This project is licensed under the MIT License.