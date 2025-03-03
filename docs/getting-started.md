# Getting Started

This guide will help you set up and run the Next Nebula Starter template on your local machine.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git
- A Supabase account (for database and authentication)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/johnwesleyquintero/next-nebula-starter.git
cd next-nebula-starter
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env.local`
   - Fill in your Supabase credentials and other required variables

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000)!

## Project Structure

```
next-nebula-starter/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   └── forms/            # Form components
├── lib/                  # Utility functions
├── styles/              # Global styles
├── public/              # Static assets
└── docs/               # Documentation
```

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-assets` - Generate project assets

## Next Steps

- Check out the [Features](./features/README.md) documentation to learn about available features
- Read the [Architecture](./architecture/README.md) guide to understand the project structure
- Visit the [Components](./components/README.md) section to explore available UI components
