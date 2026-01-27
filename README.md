# Linear Clone Frontend

A high-fidelity clone of the Linear application frontend, built with modern web technologies. This project demonstrates a professional-grade UI implementation with a focus on polished interactions, responsive design, and maintainable code architecture.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) based (incorporating Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (Sidebar)

## Key Features

- **Responsive Sidebar**: A fully collapsible and mobile-responsive sidebar akin to Linear's refined navigation.
  - **Custom Trigger**: Optimized trigger placement (bottom on desktop, top-left on mobile).
  - **Mobile Interactions**: Smooth drawer/sheet integration for smaller screens.
- **Team Switching**: Integrated team switcher component with dropdown functionality.
- **Polished UI**:
  - Dark mode by default.
  - Subtle hover states and transitions.
  - Clean typography and spacing.
- **Code Quality**:
  - "Complexity 1" focus for clean, declarative code.
  - Strictly typed components.
  - Organized component structure (`components/ui` for primitives, `components` for compositions).

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run development server**:
    ```bash
    npm run dev
    ```
3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/components/ui`: Reusable UI primitives (Buttons, Sheet, Dropdown, etc.)
- `src/components`: Feature-specific components (AppSidebar, TeamSwitcher, NavMain)
- `src/hooks`: Custom hooks (e.g., `use-mobile`)
- `src/App.tsx`: Main layout composer

## Recent Updates

- Enhanced mobile sidebar experience.
- Refactored sidebar header alignment.
- Resolved dependency issues for robust builds.
