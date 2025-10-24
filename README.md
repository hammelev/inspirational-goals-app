# Inspirational website made with React + TypeScript + Vite

## Quick Start

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
See [Environment Setup](#environment-setup) for details.

3. Start the development server:
```bash
pnpm dev
```

## Environment Setup

This project uses a multi-file environment configuration:

- `.env` - Base configuration, committed to git. Contains default values and public variables
- `.env.local` - Local overrides and secrets, NOT committed to git

### Managing Secrets

We use `.env.local` for secrets (like API keys) to prevent accidentally committing them to git.

1. Edit `.env.local` and add your secrets:
   ```properties
   VITE_UNSPLASH_ACCESS_KEY=your-actual-key-here
   ```

2. Never commit `.env.local` - it's automatically git-ignored

### Required Secrets

- `VITE_UNSPLASH_ACCESS_KEY` - Unsplash API access key
  - Get one at: https://unsplash.com/developers