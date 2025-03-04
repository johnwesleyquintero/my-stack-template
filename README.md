# Next Nebula Starter

A modern, production-ready Next.js starter template with TypeScript, ESLint, Jest, and GitHub Actions.

## Features

- ⚡️ Next.js 14 with App Router
- 📘 TypeScript
- 🧪 Jest for testing
- 📝 ESLint + Prettier
- 🔄 GitHub Actions CI
- 🔐 Environment variables validation
- 📁 Absolute imports
- 🎯 Production-ready

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/johnwesleyquintero/next-nebula-starter.git
```

2. Install dependencies:
```bash
npm install
```

3. Copy .env.example to .env.local and update the values:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript type checking

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

MIT

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
