<!--
Project-specific guidance for AI coding assistants.
Keep this short (20-50 lines) and actionable. Reference real files and commands.
-->

# Copilot / AI agent instructions — Inspirational Goals App

Quick facts

- Stack: React + TypeScript + Vite. See `package.json` and `vite.config.ts`.
- State management: Redux Toolkit slice at `src/features/background-images/backgroundImagesSlice.ts`.
- ENV: Uses Vite env vars in `.env` for Unsplash (see `.env`).

What the app does (big picture)

- Small single-page app that shows full-viewport background images fetched from Unsplash and allows forward/back navigation.
- The slice `backgroundImagesSlice` manages an array of images and a current index. The UI (`BackgroundImage.tsx`) dispatches thunks to fetch and to navigate.

How to run locally

- Install: pnpm install (project uses pnpm workspace files but npm/yarn will work if you prefer)
- Dev server: `pnpm dev` (maps to `vite`). See `scripts.dev` in `package.json`.
- Build: `pnpm build` which runs `tsc -b && vite build`.
- Preview: `pnpm preview`.

Important env vars

- `.env` contains the Vite variables used by `unsplash.service.ts`:
  - VITE_UNSPLASH_BASE_URL
  - VITE_UNSPLASH_GET_RANDOM_IMAGES_ENDPOINT
  - VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES
  - VITE_UNSPLASH_ACCESS_KEY (required to run network calls)

Project-specific conventions and patterns

- Type-safe Redux hooks: `src/app/hooks.ts` exposes `useAppDispatch` and `useAppSelector` using `withTypes<T>()`.
- Thunks and slice structure: async calls use `createAsyncThunk` (see `fetchRandomBackgroundImages`). Extra reducers use `addMatcher(isPending(...))` and `addMatcher(isRejected(...))` to handle loading/error state globally for the thunk.
- Navigation logic: `navigateForward` and `navigateBackward` are thunk-actions that either change index or dispatch additional fetches. The INIT case loads 2x the configured `VITE_UNSPLASH_NUMBER_OF_RANDOM_IMAGES` (see `backgroundImagesSlice.ts` top-level calc).
- Services: `unsplash.service.ts` composes URLs with `import.meta.env` and throws on non-OK responses — callers handle rejection via RTK's rejectWithValue.
- Styling: CSS Modules used for the background feature (`background-images.module.css`). Keep class names in the JS/TSX file matching the CSS key names.

Files to read first (high signal)

- `src/features/background-images/backgroundImagesSlice.ts` — core app state, fetch logic, navigation behavior.
- `src/features/background-images/unsplash.service.ts` — HTTP contract and env variables.
- `src/features/background-images/BackgroundImage.tsx` — how UI consumes the slice.
- `src/app/hooks.ts` and `src/app/store.ts` — type-safe RTK wiring.

Common tasks for an AI contributor

- Add a new field to each Unsplash image: update `UnsplashImageType` in `background-images.types.ts`, adjust any usages in `BackgroundImage.tsx` and tests.
- Change initial index calculation: update the INIT branch in the slice and ensure `BackgroundImage.tsx` still works when `image` is undefined.
- Add error UI: use `selectIsLoading` and `hasError` from the slice to show a small overlay in `BackgroundImage.tsx`.

Edge cases to be aware of

- env keys may be missing in developer machines; network calls will throw. Mock `unsplash.service.ts` or set `VITE_UNSPLASH_ACCESS_KEY` to test.
- Thunks append/concat arrays instead of de-duplicating. If switching to pagination or deduping, update both FORWARD and BACKWARD branches.

If you need more

- Ask to run the app and show failing console output or test errors. Point to `package.json` scripts if you want me to run build/dev commands.

Please review and tell me if you'd like a longer / more detailed agent guide or tests added.
