# Linear Frontend 🚀

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

A high-performance, modern frontend for the Linear Clone application, engineered for speed, real-time collaboration, and a premium user experience.

## ✨ Features

### 🔄 Real-time Collaboration

- **Global WebSocket Broadcasting**: Instant updates across all connected clients for issues (Create, Update, Delete).
- **Optimized Synchronization**: Issues and dashboard stats update automatically without page refreshes.

### 🎨 Modern UI/UX

- **Premium Design**: Built with **shadcn/ui** and **Tailwind CSS** for a polished, accessible, and responsive interface.
- **Dynamic Dashboard**: Real-time charts for Status Distribution, Priority Breakdown, and Project Progress.

### ⚡ Performance Engineered

- **Smart Caching**: Utilizes **TanStack Query** with `Infinity` stale time, refetching only on WebSocket signals (reducing API load by ~70%).
- **Optimized Builds**: Powered by **Vite** for lightning-fast HMR and production builds.

## 🛠️ Tech Stack

| Category           | Technology            | Usage                                |
| ------------------ | --------------------- | ------------------------------------ |
| **Core**           | React 19, TypeScript  | Component architecture & Type safety |
| **Build Tool**     | Vite                  | Dev server & Bundling                |
| **State (Server)** | TanStack Query        | API Caching & Async State            |
| **State (Client)** | Redux Toolkit         | Global UI State                      |
| **Styling**        | Tailwind CSS v4       | Utility-first styling                |
| **Components**     | shadcn/ui             | Accessible UI components             |
| **Real-time**      | Native WebSockets     | Live event handling                  |
| **Forms**          | React Hook Form + Zod | Schema-based validation              |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Vaidiasri/linenar_frontend.git
    cd linearfrontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:

    ```env
    VITE_API_URL=http://localhost:8080/api/v1
    ```

4.  **Start Development Server**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```bash
src/
├── api/            # API integration layer (Axios)
├── components/     # Reusable UI components & Features
│   ├── ui/         # shadcn/ui primitives
├── context/        # React Contexts (Socket, Auth)
├── hooks/          # Custom Hooks (useIssues, useSocket)
├── pages/          # Route components
├── store/          # Redux Store slices
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## 🔧 Key Implementations

### WebSocket Integration

The application uses a dedicated `SocketProvider` to manage persistent connections.

- **Connection**: Established on mount if authenticated.
- **Event Handling**: Listens for `ISSUE_CREATED`, `ISSUE_UPDATED`, `ISSUE_DELETED`.
- **Query Invalidation**: Triggers TanStack Query invalidation to fetch fresh data only when needed.

### Performance Optimization

Instead of polling, we use an event-driven approach:

```typescript
// useIssues.ts
useQuery({
  staleTime: Infinity, // Data never expires naturally
  refetchOnMount: false, // No refetch on mount
  // Refetch triggers ONLY via queryClient.invalidateQueries() in SocketProvider
})
```

## � Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---

Built with ❤️ by the Linear Clone Team.
