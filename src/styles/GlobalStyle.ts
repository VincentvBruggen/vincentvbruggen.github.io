import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth; // <<< ADD THIS LINE
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.colors.primary};
    font-weight: 700;
    text-shadow: 0 0 5px ${theme.colors.primary};
  }

  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.primary};
      text-shadow: 0 0 8px ${theme.colors.primary};
    }
  }

  .small-image {
      height: 100% !important;
      object-fit: contain !important;
  }

  /* Custom scrollbar for a better aesthetic */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }
`;