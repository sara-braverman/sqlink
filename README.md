# sqlink

A conference session management application built with Next.js 13, TypeScript, and Tailwind CSS.

## Features

- Browse all conference sessions
- Filter sessions by track and time of day
- Search sessions by title or speaker
- View detailed session information
- Add/remove sessions to personal agenda
- Time conflict detection for agenda sessions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/app` - Next.js 13 app directory with pages and layouts
- `/components` - React components
- `/lib` - Utility functions and data fetching
- `/types` - TypeScript type definitions
- `/data` - Static JSON data files
- `/__tests__` - Jest unit and component tests

## Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Data Fetching:** Server Components

## Architecture Decisions

### Data Loading Strategy

All session data is loaded on the **server** using Server Components:

- **Data Source:** Static JSON file (`/data/sessions.json`)
- **Loading Function:** `getSessions()` and `getSessionById()` in `/lib/sessions.ts`
- **Benefits:** Better performance, SEO-friendly, reduced client bundle size

### Component Architecture

#### Server Components (Data Fetching)

1. **Home Page** (`/app/page.tsx`)
   - **Why Server:** Fetches all sessions on the server for initial page load
   - **Data:** Calls `getSessions()` and passes to client component

2. **Session Detail Page** (`/app/sessions/[id]/page.tsx`)
   - **Why Server:** Fetches individual session data on the server
   - **Data:** Calls `getSessionById()` for dynamic route

3. **Agenda Page** (`/app/agenda/page.tsx`)
   - **Why Server:** Fetches all sessions on the server
   - **Data:** Passes sessions to client component for localStorage filtering

#### Client Components (Interactivity)

1. **SessionsList** (`/components/SessionsList.tsx`)
   - **Why Client:** Manages interactive filters and search state that require immediate user feedback
   - **State:** Track filter, time filter, search query (useState)
   - **Receives:** Sessions data as props from server
   - **Client-Side Filtering Rationale:**
     - **Instant Response:** Filtering happens immediately without server round-trips, providing a smooth user experience
     - **No Page Reloads:** Users can filter and search without losing their place or triggering full page refreshes
     - **Reduced Server Load:** All filtering logic runs in the browser, reducing server processing
     - **Better UX:** Real-time search as users type, instant filter updates on dropdown changes
     - **Data Already Available:** Since all sessions are fetched once on the server, client-side filtering is efficient
     - **State Management:** React useState hooks manage filter state locally, making the UI highly responsive

2. **AgendaList** (`/components/AgendaList.tsx`)
   - **Why Client:** Reads from localStorage to filter user's agenda
   - **State:** Agenda sessions, loading state (useState)
   - **Effect:** useEffect to read localStorage on mount
   - **Receives:** All sessions from server, filters client-side

3. **AgendaButton** (`/components/AgendaButton.tsx`)
   - **Why Client:** Manages localStorage for add/remove functionality
   - **State:** isInAgenda (useState)
   - **Effect:** useEffect to sync with localStorage
   - **Interactivity:** onClick to toggle agenda membership

### Why This Architecture?

- **Server Components:** Used for data fetching to improve performance and SEO
- **Client Components:** Used only when interactivity is needed (state, events, localStorage)
- **Hybrid Approach:** Server fetches data once, client handles user interactions

### Technology Choices

#### Why Tailwind CSS?

- **Rapid Development:** Utility-first approach enables fast UI development
- **No CSS Files:** Styles co-located with components for better maintainability
- **Small Bundle Size:** Unused styles removed in production

#### Why localStorage?

- **Client-Side Persistence:** Agenda persists across sessions without backend
- **No Authentication Required:** Simple solution without user accounts
- **Perfect for MVP:** Ideal for demo/prototype without database infrastructure

#### Why Jest + React Testing Library?

- **Industry Standard:** Most popular JavaScript testing framework
- **Next.js Integration:** Official support with built-in configuration
- **User-Centric Testing:** Tests components from user perspective

## Future Improvements

With more time, the following enhancements would be implemented:

### UI/UX Enhancements

- **Enhanced Styling:** More polished design with custom color schemes, animations, and transitions
- **Responsive Design:** Better mobile and tablet layouts with optimized touch interactions
- **Accessibility:** ARIA labels, keyboard navigation, and screen reader support

### Backend & Database

- **Real Database:** Replace localStorage with a proper database (PostgreSQL, MongoDB)
- **User Authentication:** Add user accounts with NextAuth.js or similar
- **API Routes:** Create Next.js API routes for CRUD operations
- **User Profiles:** Allow users to save preferences and view history

### Additional Features

- **Calendar Export:** Export agenda to iCal/Google Calendar
- **Email Reminders:** Send notifications before sessions start

## Development Notes

No trade-offs or shortcuts were taken due to time constraints. 