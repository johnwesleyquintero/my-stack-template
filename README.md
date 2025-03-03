# Next Nebula Starter

A modern, production-ready Next.js starter template with Supabase integration and shadcn/ui components.

## Features

- ⚡️ Next.js 14 with App Router
- 🔐 Supabase Authentication
- 🎨 shadcn/ui Components
- 🌓 Dark Mode
- 📱 Responsive Design
- 🔍 SEO Optimized
- 📊 TypeScript
- 🎯 ESLint + Prettier
- 🚀 Production Ready

## Quick Start

```bash
git clone https://github.com/johnwesleyquintero/next-nebula-starter.git
cd next-nebula-starter
npm install
npm run dev
```

## Documentation

For detailed documentation, please visit our [Documentation](https://next-nebula-starter.vercel.app/docs).

## Live Demo

Check out the [live demo](https://next-nebula-starter.vercel.app) to see the template in action.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./docs/contributing.md) for details.

## Author

**John Wesley Quintero**

- GitHub: [@johnwesleyquintero](https://github.com/johnwesleyquintero)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [Supabase](https://supabase.com/) - Backend & Authentication
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment

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
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
