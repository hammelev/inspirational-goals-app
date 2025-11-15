# Inspirational Goals - Daily Motivation & Goal Tracker

> Responsive web application allowing users to set goals, which can then later be marked as complete. The app features dynamic backgrounds with images from [Unsplash](https://unsplash.com/), inspirational quotes from [Quotable API](https://github.com/lukePeavey/quotable), and weather information from [OpenWeather API](https://openweathermap.org/).

A demo of the website can be seen here: **[Try the app here!](https://hammelev-inspirational-goals.netlify.app/)**

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Tech Stack](#tech-stack)
- [License](#license)

## Features

- **Dynamic Backgrounds**: Images from Unsplash API with proper attribution
- **Daily Inspiration**: Motivational quotes via Quotable API integration
- **Goal Management**: CRUD operations with Redux state management and local persistence
- **Weather Integration**: Real-time weather data using geolocation and OpenWeather API
- **Responsive Design**: CSS Grid/Flexbox with mobile-first approach and custom properties
- **Performance**: Serverless functions and lazy loading

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

### Required API Keys

Configure in Netlify dashboard (**Site settings → Environment variables**):

- `OPEN_WEATHER_ACCESS_KEY`: [OpenWeather API](https://openweathermap.org/api)
- `UNSPLASH_ACCESS_KEY`: [Unsplash API](https://unsplash.com/developers)

### Local Development

```bash
# Link to Netlify site for environment variables
netlify link

# Start development server
pnpm dev
```

_The project uses Netlify's environment variable system for both local development and production deployment._

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules with CSS Custom Properties
- **Validation**: Zod for runtime type safety and API response validation
- **Backend**: Netlify Serverless Functions
- **Deployment**: Netlify
- **Code Quality**: ESLint, Prettier, Stylelint
- **APIs**: Unsplash (images), Quotable (quotes), OpenWeather (weather)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
