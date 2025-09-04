# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Vincent van Bruggen, showcasing game development projects. It's built as a modern React SPA using TypeScript, Vite, and styled-components, with particle effects and smooth animations.

## Common Commands

### Development
```powershell
# Start development server (runs on all network interfaces)
npm run dev

# Build for production 
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Testing Individual Components
Since this is a portfolio site without a formal test suite, test individual components by:
1. Running the dev server: `npm run dev`
2. Navigate to specific sections using the navigation or direct anchor links (#about, #projects, etc.)
3. Test responsive behavior by resizing the browser window

## Architecture Overview

### Core Structure
- **Single Page Application**: Uses React Router for client-side routing with two main routes:
  - `/` - Main portfolio page with all sections
  - `/projects/:projectId` - Individual project detail pages
- **Component-Based Architecture**: Modular components with co-located styles using styled-components
- **Data-Driven Projects**: Project information stored in `src/data/projects.json` and rendered dynamically

### Styling System
- **styled-components**: CSS-in-JS with TypeScript support
- **Centralized Theme**: Color palette, fonts, and spacing defined in `src/styles/theme.ts`
- **Responsive Design**: Mobile-first approach with consistent breakpoints (mainly 600px and 900px)
- **Animation**: Framer Motion for scroll-triggered animations and smooth transitions

### Key Directories
- `src/components/`: Reusable UI components (ProjectCard, Section, etc.)
- `src/sections/`: Page section components (currently unused, sections defined inline in App.tsx)
- `src/styles/`: Theme and global styles
- `src/data/`: JSON data for projects
- `src/assets/images/`: Static image assets
- `public/`: Public static assets served directly

### State Management
- **Local State Only**: Uses React hooks (useState) for simple UI state (mobile menu toggle)
- **No Global State**: Portfolio is largely static with data coming from JSON files

### External Dependencies
- **tsparticles**: Animated background particles
- **framer-motion**: Smooth animations and scroll effects  
- **react-icons**: Icon library (Font Awesome, Simple Icons)
- **react-router-dom**: Client-side routing

## Development Notes

### Adding New Projects
1. Add project data to `src/data/projects.json` following the existing schema
2. Add project images to `src/assets/images/` or `public/assets/images/`
3. Optionally create a detailed project page in `src/projects/[id].tsx`

### Styling Patterns
- Use the centralized theme from `src/styles/theme.ts` for consistency
- Follow the existing responsive patterns with mobile-first design
- Maintain the neon/cyberpunk aesthetic with the established color palette
- Use styled-components with TypeScript for type-safe styling

### Animation Considerations
- Section animations are handled by the `Section` component wrapper
- Use framer-motion for consistent animation patterns
- Mobile devices have adjusted viewport triggers for better performance

### Route Structure
- Main portfolio content is rendered at the root route (`/`)
- Individual project pages use the pattern `/projects/:projectId`
- All routing is client-side using React Router's BrowserRouter

### Performance Notes
- Vite provides fast HMR during development
- Images should be optimized before adding to the assets directory
- Particle effects are configured to be lightweight using tsparticles-slim
