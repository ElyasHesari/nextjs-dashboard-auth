# Next.js Dashboard Authentication

This project is an administrative dashboard with an authentication system built using Next.js 15 and React 19.

## 📐 Design Reference

The user interface design of this project is based on the design presented on the Dribbble website:

**🔗 Original Design Link:** [Intra-organizational messenger Login Page](https://dribbble.com/shots/15073288-Intra-organizational-messenger-Login-Page)

## 🚀 Technologies and Libraries Used

### Core Technologies

- **Next.js**: Version `15.5.6` - React framework for building Server-Side Rendering and Static Site Generation applications
- **React**: Version `19.1.0` - Main UI library
- **React DOM**: Version `19.1.0` - React renderer for the browser
- **TypeScript**: Version `^5` - Programming language with static type support

### State Management & Data Fetching

- **Zustand**: Version `^5.0.2` - Lightweight state management library
- **React Query**: Version `^5.62.10` - Powerful data synchronization library for React

### UI Libraries and Icons

- **Lucide React**: Version `^0.552.0` - Modern and beautiful icon collection for React
- **Tailwind CSS**: Version `^4` - CSS framework for fast and responsive styling
  - **@tailwindcss/postcss**: Version `^4` - PostCSS plugin for Tailwind

### Development Tools

- **ESLint**: Version `^9` - Code linter for maintaining quality and code standards
  - **eslint-config-next**: Version `15.5.6` - ESLint configuration for Next.js
  - **@eslint/eslintrc**: Version `^3` - ESLint configuration
- **TypeScript Types**:
  - **@types/node**: Version `^20` - TypeScript types for Node.js
  - **@types/react**: Version `^19` - TypeScript types for React
  - **@types/react-dom**: Version `^19` - TypeScript types for React DOM

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard page
│   ├── login/              # Login page
│   ├── layout.tsx          # Main layout with QueryProvider
│   └── page.tsx            # Home page (redirect logic)
├── components/             # Reusable components
│   ├── LoginForm.tsx       # Login form
│   ├── DashboardContent.tsx # Dashboard content
│   └── ...
├── stores/                 # Zustand state management
│   └── authStore.ts        # Authentication store
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Authentication hooks
│   └── useDashboard.ts     # Dashboard data hooks
├── providers/              # React providers
│   └── QueryProvider.tsx   # React Query provider
├── services/              # API services
│   └── mockApi.ts         # Mock API service for testing
├── types/                 # TypeScript type definitions
│   └── index.ts
├── i18n/                  # Internationalization system
│   ├── translations.ts     # Translations
│   └── useTranslation.ts   # Translation hook
└── middleware.ts          # Next.js Middleware
```

## 🔐 Authentication Flow

### 1. State Management System

The project uses **Zustand** for managing authentication state:

- **authStore** (`src/stores/authStore.ts`): A Zustand store that manages authentication state with persistence
- Uses Zustand's `persist` middleware for automatic localStorage integration

### 2. State Storage

Authentication state is stored **persistently** in the browser's `localStorage`:

- **auth-storage**: Key used for storing auth state
- Automatically persisted and rehydrated on page load

**Benefits:**
- ✅ Maintains login state after page refresh
- ✅ Fast access to state throughout the application
- ✅ Lightweight and performant with Zustand
- ✅ Automatic persistence with middleware

### 3. Login Process

```
1. User enters credentials (username/password)
2. LoginForm uses useLogin() hook with React Query
3. React Query calls apiService.login() with mutation:
   - Checks username and password
   - Simulates network delay (1.5 seconds)
   - 5% chance of network or server error
4. On success:
   - authStore.login() is called via Zustand
   - Data is automatically persisted to localStorage
   - User is redirected to /dashboard page
5. On error:
   - Appropriate error message is displayed
```

### 4. Route Protection

- **Home Page** (`/`): Redirects to `/login` or `/dashboard` based on authentication status
- **Login Page** (`/login`): If user is logged in, redirects to `/dashboard`
- **Dashboard Page** (`/dashboard`): If user is not logged in, redirects to `/login`

## 🌐 Internationalization (i18n) System

The project uses a simple internationalization system:

- **translations.ts**: All application texts in Persian
- **useTranslation Hook**: For accessing translations in components

## 🎨 Styling

- **Tailwind CSS v4**: For all styles
- **Responsive Design**: Responsive design using Tailwind breakpoints
- **RTL Support**: Full support for right-to-left (RTL) for Persian

## 🔑 Test Credentials

To test the login system, you can use the following credentials:

- **Username**: `admin` | **Password**: `admin123` (Role: admin)
- **Username**: `owner` | **Password**: `owner123` (Role: owner)

## 📦 How to Run the Project

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm** or **yarn** or **pnpm** or **bun**

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Run Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

### Run Linter

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 🔧 Project Features

- ✅ Complete authentication system with Zustand
- ✅ Data fetching with React Query
- ✅ Persistent storage with Zustand middleware
- ✅ Route Protection
- ✅ Modern UI with Tailwind CSS
- ✅ Full RTL support for Persian
- ✅ Internationalization (i18n) system
- ✅ Mock API for testing
- ✅ TypeScript for type safety
- ✅ Loading States and Error Handling
- ✅ Responsive Design

## 📝 Additional Notes

- The project uses **Next.js App Router** (not Pages Router)
- Uses **Turbopack** for faster builds (in dev and build scripts)
- All client-side components are marked with `'use client'`
- **TypeScript** is used for type safety
- Uses **Zustand** for lightweight state management
- Uses **React Query** for efficient data fetching and caching
- State persistence handled automatically by Zustand middleware

## 📄 License

This project is a sample and educational project.

---

**Made with ❤️ using Next.js and React**
