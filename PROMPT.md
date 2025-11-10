# Prompt Usage

## Project Init
```markdown
build an Anime Search App - a two-page application where users can search for anime and view details.
 
**Page 1:** Search page displaying results
 
**Page 2:** Detail page for selected anime, the detail information may refer
https://anilist.co/anime/182896/Boku-no-Hero-Academia-FINAL-SEASON/
 
**API:** [Jikan](https://docs.api.jikan.moe/) API - free, no authentication required
 
## Technical Requirements
 
### Core Stack:
 
- React 18 or higher

- React hooks only (no class components)
 
- TypeScript
 
- react-router-dom for navigation
 
- Redux for state management
 
- UI library of your choice
 
- Single Page App only (no Next.js)
 

### Functionality:
 
- Server-side pagination on the search page
 
- Instant search with debouncing (see details below)
 
- Must use redux for state management
 

## Instant Search Implementation
 
The search bar should work without requiring users to press Enter or click a button:
 
- Debounce API calls to 250ms intervals to avoid excessive requests
 
- Cancel any in-flight API requests if the user continues typing
 
- This prevents making calls on every keystroke while keeping search responsive

## Code Guidelines 

1. **Correct Implementation** - All features work as described, proper routing, and state management
2. ** TypeScript Usage** - Proper typing throughout with minimal use of 'any' types
3. **Code Organization** - Logical folder structure, reusable components, and clear separation of concerns that makes it easy for other developers to extend your work
4. **Code Quality** - Clean, well-formatted code following React and TypeScript best practices
5. **React Best Practices** - Proper hook usage, avoiding anti-patterns, efficient re-rendering
6. Proper error handling (network failures, rate limiting, invalid API responses)
7. Race condition handling
8. Unit or integration tests

## Project Structure

src/
|
|-- assets/             # Static assets (images, fonts, svgs)
|   |-- images/
|   |-- fonts/
|
|-- components/         # Global, reusable, "dumb" UI components
|   |-- common/         # Atomic components (Button, Input, Modal, Spinner)
|   |   |-- Button.tsx
|   |   |-- Button.test.tsx
|   |   |-- index.ts
|   |-- layout/         # Structural components (Header, Footer, Sidebar, Layout)
|   |   |-- Header.tsx
|   |   |-- Layout.tsx
|   |   |-- index.ts
|   |-- ErrorBoundary.tsx # A global error boundary component
|
|-- features/           # "Smart" components and logic, sliced by feature
|   |-- auth/           # Example: Authentication feature
|   |   |-- api/        # RTK Query API slice for this feature
|   |   |   |-- authApi.ts
|   |   |-- components/ # Components specific to this feature (LoginForm, ProfileMenu)
|   |   |   |-- LoginForm.tsx
|   |   |   |-- LoginForm.test.tsx
|   |   |-- hooks/      # Custom hooks for this feature (e.g., useAuth)
|   |   |-- slices/     # Redux state slice for this feature (e.g., authSlice.ts)
|   |   |-- types/      # TypeScript types and interfaces for this feature
|   |   |-- index.ts    # Barrel file to export public parts of the feature
|   |
|   |-- profile/        # Example: User profile feature
|   |   |-- api/
|   |   |-- components/
|   |   |-- types/
|   |   |-- index.ts
|
|-- hooks/              # Global, reusable custom hooks (e.g., useTheme, useDebounce)
|
|-- lib/                # Third-party library setup and configuration
|   |-- muiTheme.ts     # MUI theme definition
|
|-- pages/              # Top-level route components (the "views")
|   |-- HomePage.tsx
|   |-- LoginPage.tsx
|   |-- ProfilePage.tsx
|   |-- NotFoundPage.tsx
|
|-- router/             # React Router configuration
|   |-- AppRouter.tsx   # Defines all <Routes> and <Route>
|   |-- ProtectedRoute.tsx # Component for routes requiring authentication
|
|-- store/              # Redux store setup
|   |-- store.ts        # The Redux store configuration
|   |-- rootReducer.ts  # Combines all reducers and RTK Query slices
|   |-- hooks.ts        # Pre-typed useAppDispatch and useAppSelector hooks
|
|-- styles/             # Global styles, fonts, and variables
|   |-- global.css
|
|-- types/              # Global TypeScript types (e.g., environment variables)
|   |-- vite-env.d.ts
|
|-- utils/              # Global utility/helper functions (e.g., formatters, validators)
|
|-- App.tsx             # Root component (renders providers and router)
|-- main.tsx            # Application entry point


## Unit Test
 * Co-location: Unit tests (.test.tsx) live right next to the file they are testing (e.g., Button.tsx and Button.test.tsx). This makes them easy to find and encourages testing.
 * Integration Tests: More complex tests (e.g., testing a full feature flow) can also live within the feature folder.
 * Setup: A src/setupTests.ts (or similar file configured in vite.config.ts) is used to set up the testing environment, such as importing @testing-library/jest-dom.

## UI/X Guidelines 
- Creative UI with unique "wow" factor
- Skeleton loaders or meaningful loading states
- Empty state and no results handling with helpful messaging
- Mobile responsiveness
- Additional features that enhance the project

```

## Recognize the project
```markdown
Anime Search Webiste
you are reactjs redux senior
recognize @AGENT.md
```
This prompt was generated language switcher component and flow

## Fixing Error
- @src/pages/DetailPage.tsx I got blank page when visit detail page because useEffect is called after return statement
- [translate.ts](src/utils/translate.ts) let use anthropic API, here the sample request
```
#!/bin/sh
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --data \
'{
    "model": "claude-sonnet-4-5",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, Claude"}
    ]
}'
```
please use fast model for translation
I added the key ANTROPIC_API_KEY

## Fixing Error Build
- [jikanApi.ts](src/features/anime/api/jikanApi.ts) I get error when run build
'r' is declared but its value is never read.
'e' is declared but its value is never read.
- [DetailPage.tsx](src/pages/DetailPage.tsx) get error on line 51 No overload matches this call.
- [http.ts](src/utils/http.ts) line 7 get error whe run build 
error TS2345: Argument of type '[...any[], any]' is not assignable to parameter of type 'T'.
- still get same error for DetailPage and HomePage
 No overload matches this call.
  Overload 1 of 2, '(props: { component: ElementType<any, keyof IntrinsicElements>; } & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<...> & Omit<...>): Element | null


## Unit Test Generation
- create vite test for [HomePage.tsx](src/pages/HomePage.tsx)
- [HomePage.test.tsx](src/pages/HomePage.test.tsx) get error when running the test
No "jikanApi" export is defined on the "../features/anime/api/jikanApi" mock. Did you forget to return it from "vi.mock"?
- create vite test for [DetailPage.tsx](src/pages/DetailPage.tsx
- [DetailPage.test.tsx](src/pages/DetailPage.test.tsx) get error when running the test

## Saving search text after click AnimeCard
- [HomePage.tsx](src/pages/HomePage.tsx) when I click the AnimeCard I is redirected to DetailPage, but when I click Home, my search text is missing, can we retain it so able to choose another AnimeCard ? Please redux to store the state