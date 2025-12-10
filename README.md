# AI Collection Builder

A production-quality React + TypeScript web application for creating AI-assisted collection templates. Users can describe their collection needs, browse AI-generated templates, and confirm selections through an intuitive wizard interface.

**Live Demo**: Run locally with `npm run dev` → http://localhost:5173

## 🎯 Features

- **AI-Powered Wizard Flow**: 3-step wizard (Input → Preview → Confirm) with URL-driven state management
- **Mock AI API**: Realistic 1.5-2.5s latency simulation with error handling
- **Responsive Design**: Desktop-first, graceful degradation to mobile (375px+)
- **Smooth Animations**: Framer Motion transitions and micro-interactions
- **Accessibility**: WCAG compliant focus states, ARIA labels, and semantic HTML
- **Type-Safe**: Full TypeScript coverage with strict mode enabled
- **Tested**: Vitest unit tests + Playwright E2E tests for happy path

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested on Node 22)
- npm or pnpm

### Installation & Running

```bash
# Install dependencies
npm install

# Start dev server (includes MSW mock API)
npm run dev

# Visit http://localhost:5173
```

### Build & Test

```bash
# Build for production
npm run build

# Run production build locally
npm run preview

# Run unit tests
npm run test

# Run E2E tests (requires dev server running)
npm run e2e

# Run E2E tests in UI mode
npm run e2e:ui
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CollectionCard.tsx    # Template card with selection state
│   ├── InputStep.tsx         # Prompt input with suggestion chips
│   ├── PreviewStep.tsx       # Template grid and loading/error states
│   ├── ConfirmStep.tsx       # Confirmation screen
│   ├── LoadingState.tsx      # Spinner and skeleton loader
│   └── ErrorState.tsx        # Error message with retry
├── pages/
│   └── Wizard.tsx           # Main wizard orchestrator with routing
├── hooks/
│   └── useGenerateCollection.ts  # React Query mutation hook
├── mocks/
│   ├── handlers.ts          # MSW request handlers for API
│   └── browser.ts           # MSW worker bootstrap
├── App.tsx                  # Root routes
├── main.tsx                 # React entry point (starts MSW in dev)
└── index.css                # Tailwind + custom animations
e2e/
├── happy-path.spec.ts       # Playwright E2E tests
```

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo 600)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Neutral**: 50-900 grayscale

### Typography
- **Headings**: Bold, letter-spacing -0.02em
- **Body**: Avenir, 16px base
- **Font Stack**: System fonts with Avenir fallback

### Spacing
- Base unit: 0.5rem (8px)
- Components use: `px-6 py-4` (24px × 16px padding)
- Grid gaps: `gap-6` (24px)

## 🔧 Architecture Decisions

### 1. **URL-Driven State** (`?step=input|preview|confirm`)
- **Why**: Enables browser back/forward, shareable links, and SSR-ready routing
- **Tradeoff**: Form values stored as URL params; persists across page reloads for UX

### 2. **React Query + Mutation** (not Query)
- **Why**: Designed for one-off AI calls; mutations with loading/error states are perfect for form submissions
- **Tradeoff**: No built-in caching; could be added later if templates were fetched multiple times

### 3. **MSW for Mock API** (not Express server)
- **Why**: Runs in-browser, no extra port/process, works with Vite HMR seamlessly
- **Realistic**: Configurable delays (1.5-2.5s) to simulate real latency
- **Error Testing**: Triggers 500 on keywords (`"error"`, `"fail"`)

### 4. **Framer Motion Animations** (not CSS-only)
- **Why**: Complex multi-step transitions; layout animations on gallery reflow
- **Tradeoff**: Adds ~40KB to bundle; could optimize with Tailwind CSS animations for simple cases

### 5. **Lazy Loading with Suspense**
- **Why**: Each step is a route segment; components are wrapped in `<Suspense>`
- **Benefit**: Reduces initial bundle load; better for code splitting

## 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)
- InputStep: Form submission, suggestion chip interactions, disabled state
- CollectionCard: Selection state, styling, accessibility attributes
- Located in `src/components/*.test.tsx`

### E2E Tests (Playwright)
- **Happy Path**: Input → Loading → Preview → Select → Error handling
- **Responsive**: Mobile viewport (375px) layout verification
- **Error Recovery**: Error state shows retry button; retry succeeds
- Run before deployment to verify full user flow

## 📦 Bundle Size

Current production build:
- Initial JS: ~104 KB (gzipped)
- CSS: ~4 KB (gzipped)
- **Total**: ~140 KB (target: <150 KB ✓)

### Code Splitting
```
vendor-*.js        (React, React DOM, React Router)
query-*.js         (TanStack Query)
index-*.js         (App code)
```

## ♿ Accessibility Features

- **Focus Management**: Focus moves to main on step transitions
- **Focus Styles**: 2px outline with 2px offset, meets WCAG AAA contrast
- **ARIA Labels**: All buttons have descriptive labels
- **Semantic HTML**: `<button>`, `<form>`, `<article>` elements
- **Loading States**: `aria-live="polite"` on preview section
- **Keyboard Navigation**: Tab through chips and cards, Enter to submit

## 🚀 Performance Optimizations

1. **Code Splitting**: Routes lazy-loaded with `React.lazy + Suspense`
2. **Image Optimization**: Placeholders use CSS (no actual images)
3. **CSS**: Tree-shaken Tailwind; only used classes in bundle
4. **Minification**: Terser with ECMAScript 2020 target

## 🔄 State Management Flow

```
URL (?step=input|preview|confirm)
  ↓
Wizard Component (orchestrates steps)
  ├→ InputStep (form state via React Hook Form)
  │   └→ useGenerateCollection mutation
  │
  ├→ PreviewStep (displays mutation.data)
  │   └→ Handles selection → URL update
  │
  └→ ConfirmStep (shows selected template)
      └→ onConfirm → success message
```

## 📋 Known Limitations & Tradeoffs

1. **No Backend Persistence**: Mock API only; selections not saved
2. **Single Collection Type**: Expands to multiple types easily in `src/mocks/handlers.ts`
3. **No Image Uploads**: Placeholder colors only; real images can be added
4. **No Advanced Filtering**: Could add category/price filters to preview
5. **Limited Customization**: Templates are static; could add amount picker UI

## 🛠️ Development Tips

### MSW Debugging
- MSW logs requests to browser console in dev mode
- To see all requests: `worker.listen()` in `src/mocks/browser.ts`

### React Query DevTools
- Install `@tanstack/react-query-devtools` to inspect mutations
- Useful for debugging loading/error states

### Tailwind IntelliSense
- VS Code: Install "Tailwind CSS IntelliSense" extension
- Auto-complete class names

## 📝 Notes for Code Review

### Why Framer Motion?
Step animations are smooth with spring physics. CSS keyframes alone would require more manual timing. Framer Motion's `AnimatePresence` handles entering/exiting states elegantly.

### Why Not Redux?
URL state + React Hook Form + React Query is sufficient for this scope. Redux adds complexity for a 3-step form.

### Why Not Styled Components?
Tailwind is faster to iterate and produces smaller CSS. No runtime overhead.

## 🎯 Future Enhancements

If more time available:
1. **Storybook**: Interactive component library
2. **Custom Amount Input**: Let users set custom donation amounts
3. **Multi-Select**: Allow saving multiple templates
4. **Real Backend**: Connect to actual collection API
5. **Analytics**: Track user flow with event tracking
6. **i18n**: Internationalization support

## 📄 License

MIT
