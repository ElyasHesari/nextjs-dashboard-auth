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
│   ├── layout.tsx          # Main layout with AuthProvider
│   └── page.tsx            # Home page (redirect logic)
├── components/             # Reusable components
│   ├── LoginForm.tsx       # Login form
│   ├── DashboardContent.tsx # Dashboard content
│   └── ...
├── contexts/              # Context API for state management
│   └── AuthContext.tsx     # Authentication management context
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

The project uses **React Context API** for managing authentication state:

- **AuthContext** (`src/contexts/AuthContext.tsx`): A Context Provider that manages authentication state
- **AuthProvider**: Located in `app/layout.tsx` and wraps the entire application

### 2. State Storage

Authentication state is stored **persistently** in the browser's `localStorage`:

- **auth_token**: User authentication token
- **user**: User information (username, role, token)

**Benefits:**
- ✅ Maintains login state after page refresh
- ✅ Fast access to state throughout the application
- ✅ Automatic management with Context API

### 3. Login Process

```
1. User enters credentials (username/password)
2. LoginForm sends data to apiService.login()
3. apiService (Mock API) performs validation:
   - Checks username and password
   - Simulates network delay (1.5 seconds)
   - 5% chance of network or server error
4. On success:
   - AuthContext.login() is called
   - Data is saved to localStorage
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

- ✅ Complete authentication system with Context API
- ✅ Persistent storage in localStorage
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

## 📄 License

This project is a sample and educational project.

---

**Made with ❤️ using Next.js and React**
