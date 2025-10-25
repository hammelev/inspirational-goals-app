# Inspirational website made with React + TypeScript + Vite

## Quick Start

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Set up environment variables:
    See [Environment Setup](#environment-setup) for details.

3. Configure your editor:
    See [Editor Setup](#editor-setup) for VS Code configuration.

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

## Editor Setup

### VS Code Configuration

1. **Required Extensions:**
   - [StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. **Workspace Settings:**
   The project includes VS Code workspace settings (`.vscode/settings.json`) for consistent formatting and linting across the team. These settings:
   - Enable automatic CSS formatting on save
   - Configure StyleLint as the default CSS formatter
   - Ensure consistent styling across the team

   No additional configuration is needed as these settings are version-controlled.

### CSS Styling Conventions

We use StyleLint with recess-order for consistent CSS property ordering. The configuration:

- Orders properties in logical groups (positioning → layout → box model → visual)
- Adds empty lines between property groups for readability
- CSS custom properties (variables) are manually alphabetically ordered

To manually fix styling issues:

```bash
pnpm lint:css:fix
```

## Linting and Formatting

This project uses ESLint for TypeScript/JavaScript and Stylelint for CSS.

### VS Code Setup

To automatically format and fix linting errors on save in VS Code, you can use the recommended extensions and settings.

#### 1. Install Extensions

Install the following VS Code extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

#### 2. Configure `settings.json`

Open your VS Code `settings.json` file and add the following configuration:

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.fixAll.stylelint": "explicit"
    },
    "stylelint.validate": [
        "css"
    ],
    "[css]": {
        "editor.defaultFormatter": "stylelint.vscode-stylelint"
    },
    "css.validate": false,
    "editor.codeActions.triggerOnFocusChange": true
}
```

This configuration will:

- Automatically fix ESLint and Stylelint errors on save.
- Set Stylelint as the default formatter for CSS files.
- Disable the default CSS validation in VS Code to prevent conflicts.
