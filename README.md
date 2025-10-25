# Inspirational website made with React + TypeScript + Vite

## Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:
   See [Environment Setup](#environment-setup) for details.

3. Configure your editor:
   See [Development Setup](#development-setup) for VS Code configuration.

4. Start the development server:

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
  - Get one at: <https://unsplash.com/developers>

## Development Setup

### Editor Configuration (VS Code)

This project includes pre-configured VS Code settings and recommended extensions for consistent development experience across the team.

1. **Install Required Extensions:**
   VS Code will automatically prompt you to install the recommended extensions when you open the project. If not:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

2. **Editor Settings:**
   The project includes `.vscode/settings.json` with all necessary configuration for:
   - Auto-formatting on save for TypeScript/JavaScript (ESLint)
   - CSS formatting and linting (StyleLint)
   - Proper TypeScript settings

   No manual configuration needed - all settings are version-controlled.

### Code Style

- **TypeScript/JavaScript**: ESLint enforces consistent code style
- **CSS:**
  - StyleLint with recess-order for logical property grouping
  - Properties ordered by: positioning → layout → box model → visual
  - Automatic empty lines between property groups
  - CSS custom properties (variables) are alphabetically ordered

### Code Quality Commands

```bash
# Check all TypeScript/JavaScript files
pnpm lint:js

# Check all CSS files
pnpm lint:css

# Fix CSS formatting
pnpm lint:css:fix

# Run all linting checks
pnpm lint
```
