# GitHub Repositories

A modern web application for exploring trending GitHub repositories. This application fetches and displays repositories created in the last 30 days.

## Project Overview

GitHub Repositories Explorer is a single-page application that allows users to browse trending GitHub repositories. The application features:

- Infinite scrolling for seamless browsing of repositories
- Light and dark theme support with system preference detection
- Responsive design using TailwindCSS
- Error handling with toast notifications

## Architecture

The application follows a feature-based architecture with the following structure:

```
src/
├── app/
│   ├── core/                 # Core functionality (services, interceptors)
│   │   ├── interceptors/     # HTTP interceptors
│   │   ├── services/         # Core services
│   │   └── themes/           # Theme management
│   ├── features/             # Feature modules
│   │   └── repositories/     # Repositories feature
│   │       ├── components/   # UI components
│   │       ├── models/       # Data models
│   │       └── services/     # Feature-specific services
│   └── shared/               # Shared functionality
│       └── directives/       # Shared directives
└── assets/                   # Static assets
```

### Key Components

- **App Component**: The root component that sets up the application layout and theme toggle
- **RepoListComponent**: Displays the list of repositories with infinite scrolling
- **GithubApiService**: Handles API communication with GitHub
- **ThemeService**: Manages theme switching and persistence
- **HTTP Error Interceptor**: Centralized error handling for API requests

## Technology Stack

### Frontend

- **Framework**: Angular 20
- **State Management**: Angular Signals
- **Styling**: TailwindCSS 4
- **HTTP Client**: Angular HttpClient
- **Notifications**: ngx-toastr
- **Icons**: Lucide

### Development Tools

- **Package Manager**: npm
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky

## Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation Steps

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd github-repos
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Development

### Development Server

To start a local development server, run:

```bash
npm start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
npm run build
# or
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running Unit Tests

To execute unit tests with Jest, use the following command:

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Additional Information

### API Usage

The application uses the GitHub Search API to fetch repositories. The API has rate limiting, so be aware of potential limitations when making frequent requests.

### Browser Compatibility

The application is designed to work with modern browsers that support ES6+ features.

### Accessibility

The application supports both light and dark themes.
