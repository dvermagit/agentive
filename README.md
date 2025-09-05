# Agentive

Agentive is an AI-powered platform for analyzing YouTube videos, extracting transcripts, and generating titles and thumbnails using advanced agents. Built with Next.js, TypeScript, and Convex, Agentive provides a modern, extensible foundation for video intelligence applications.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Usage](#usage)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **YouTube Video Analysis**: Analyze YouTube videos by URL and extract metadata.
- **Transcript Extraction**: Retrieve and process video transcripts.
- **AI Title Generation**: Generate engaging video titles using AI.
- **AI Thumbnail Generation**: Create thumbnails with generative AI.
- **Usage Management**: Feature flag and usage plan support.
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS.

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Backend**: Convex (serverless database & functions)
- **AI/ML**: Custom tools for title and image generation
- **Styling**: Tailwind CSS, custom UI components
- **Other**: ESLint, PostCSS, pnpm

---

## Project Structure

```

actions/         # Server actions for video analysis, transcript, title, and image generation
app/             # Next.js app directory (routes, pages, API endpoints)
components/      # React components (UI, forms, feature modules)
convex/          # Convex backend config, schema, and server functions
features/        # Feature flag management
lib/             # Utility functions and helpers
public/          # Static assets (SVGs, images)
tools/           # AI and utility tools (fetch transcript, generate image/title)
types/           # TypeScript type definitions
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Convex account (for backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/agentive.git
   cd agentive
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values (see [Environment Variables](#environment-variables)).
4. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory. Example variables you may need:

```
NEXT_PUBLIC_CONVEX_URL=your-convex-url
YOUTUBE_API_KEY=your-youtube-api-key
OPENAI_API_KEY=your-openai-api-key
```

Refer to the codebase and Convex documentation for all required variables.

---

## Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the app for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

---

## Usage

1. **Analyze a YouTube Video:**
   - Enter a YouTube URL in the provided form.
   - The app extracts the video ID, fetches details, and displays analysis.
2. **Generate Transcript, Title, and Thumbnail:**
   - Use the respective buttons/components to trigger AI-powered generation.
3. **Manage Usage and Plans:**
   - Access the `/manage-plan` route to view or change your usage plan.

---

## Architecture Overview

- **Next.js App Router**: Handles routing, layouts, and API endpoints.
- **Convex**: Manages data storage, authentication, and serverless functions.
- **Actions Layer**: Contains server actions for video analysis, transcript fetching, and AI generation.
- **Feature Flags**: Enable/disable features dynamically via `features/flags.ts`.
- **Component-Driven UI**: Modular React components for each feature and UI element.
- **AI Tools**: Custom tools in `tools/` for integrating with OpenAI or other AI services.

---

## Contributing

1. Fork the repository and create your branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add new feature'`
3. Push to your fork: `git push origin feature/your-feature`
4. Open a Pull Request

Please follow the code style and add tests where appropriate.

---

## License

This project is licensed under the MIT License.

---

For questions or support, please open an issue or contact the maintainer.
