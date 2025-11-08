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

This project uses a two-tier configuration approach:

1. **Base configuration** (`.env`): Contains non-sensitive default values and public configuration. Committed to version control.

2. **Secrets** (Netlify site configuration): Sensitive API keys are configured in the Netlify dashboard under **Site settings → Environment variables**. Both local development (via Netlify CLI) and production deployments pull secrets from here. See [Netlify's environment variables documentation](https://docs.netlify.com/environment-variables/overview/).

### Required Secrets

The following API keys must be configured in Netlify:

- `OPEN_WEATHER_ACCESS_KEY`: API key for OpenWeather API (required for serverless function)
- `UNSPLASH_ACCESS_KEY`: API key for Unsplash API (required for serverless function)

### Local Development

When running `pnpm dev`, the Vite Netlify plugin automatically pulls environment variables from your linked Netlify site and merges them with `.env`.

**First-time setup**: Run `netlify link` to connect your local project to a Netlify site.

## Development Setup

### Editor Configuration (VS Code)

This project includes pre-configured VS Code settings and recommended extensions for consistent development experience across the team.

1. **Install Required Extensions:**
   VS Code will automatically prompt you to install the recommended extensions when you open the project. If not:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - JavaScript/TypeScript linting
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
   - [StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - CSS linting

2. **Editor Settings:**
   The project includes `.vscode/settings.json` with all necessary configuration for:
   - Auto-formatting on save with Prettier (all supported file types)
   - ESLint integration for TypeScript/JavaScript
   - StyleLint integration for CSS
   - Proper TypeScript settings

   No manual configuration needed - all settings are version-controlled.

### Code Style

- **TypeScript/JavaScript/JSON/Markdown**: Prettier handles formatting with auto-formatting on save
- **Linting**:
  - ESLint enforces code quality rules for TypeScript/JavaScript
  - StyleLint enforces CSS conventions
- **CSS Property Ordering:**
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
