# 🚀 Next Nebula Starter

A production-ready Next.js 14 starter template with Supabase Auth, shadcn/ui, and TypeScript.

## ✨ Features

- 🔐 **Authentication** - Supabase Auth with secure session management
- 🎨 **UI Components** - Beautiful and accessible components using shadcn/ui
- 🌙 **Dark Mode** - Built-in dark mode with system preference detection
- 📱 **Responsive** - Mobile-first design approach
- 🔒 **Type-Safe** - Full TypeScript support
- 🚦 **Environment Management** - Robust environment variable handling
- 🛡️ **Security Headers** - Pre-configured security headers
- 📊 **Error Tracking** - Built-in error logging and monitoring
- 🎯 **SEO Optimized** - Meta tags and OpenGraph support
- 🔄 **PWA Ready** - Progressive Web App configuration

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [Supabase](https://supabase.com/) - Backend & Authentication
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment

## 🚀 Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/johnwesleyquintero/next-nebula-starter.git
cd next-nebula-starter
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Run the development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
├── app/                  # Next.js 14 app directory
├── components/          # React components
├── lib/                # Utility functions and hooks
├── public/             # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## 🔧 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Optional environment variables:

- `NEXT_PUBLIC_STORAGE_KEY`: Storage encryption key
- `NEXT_PUBLIC_VERCEL_ENV`: Deployment environment
- `NEXT_PUBLIC_APP_VERSION`: Application version
- `NEXT_PUBLIC_BASE_PATH`: Base path for the application

## 🔒 Security

- Secure environment variable handling
- HTTP security headers
- CSRF protection
- XSS prevention
- Content Security Policy

## 📱 PWA Support

The template includes Progressive Web App support with:

- Manifest file
- Service Worker
- Offline functionality
- App icons

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**John Wesley Quintero**

- GitHub: [@johnwesleyquintero](https://github.com/johnwesleyquintero)

## 💫 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Supabase Team](https://supabase.com/)
- [shadcn](https://twitter.com/shadcn)
- [Vercel](https://vercel.com/)

## Running in GitHub Codespaces

1. Click the "Code" button on your GitHub repository
2. Select "Create codespace on main"
3. Wait for the codespace to be created and initialized
4. Once ready, the development server will start automatically

### Environment Setup in Codespaces

1. Copy the environment variables:

```bash
cp .env.example .env.local

