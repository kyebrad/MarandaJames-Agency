# MarandaJames Agency

A faith-based women's transitional shelter in Niagara Falls, NY, providing a supportive bridge to independent housing and demonstrating the life-changing gospel of Jesus Christ.

## Overview

This repository contains the frontend codebase for the MarandaJames Agency website. It is built using modern web technologies to ensure a fast, accessible, and responsive user experience.

### Key Features
- **Accessibility First:** Fully compliant with WCAG guidelines, including ARIA attributes, keyboard navigation, and high color contrast.
- **Safety Features:** Includes a "Quick Exit" button for users who may be in unsafe situations, allowing them to rapidly leave the site.
- **AI-Powered Resources:** Integrates Google Gemini AI to provide real-time community resources, nearby safe locations, and an empathetic chatbot assistant.
- **Responsive Design:** Optimized for all devices, from mobile phones to large desktop screens.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Markdown Rendering:** `react-markdown`

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/marandajames-agency.git
   cd marandajames-agency
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in your API keys.
   ```bash
   cp .env.example .env
   ```
   *Note: You will need a valid Gemini API key for the AI features to work.*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

```
├── src/
│   ├── components/      # Reusable React components (Header, Hero, Footer, etc.)
│   ├── lib/             # Utility functions and API clients (e.g., Gemini setup)
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind configuration
├── public/              # Static assets
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
