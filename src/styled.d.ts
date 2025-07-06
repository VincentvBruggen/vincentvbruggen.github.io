// src/styled.d.ts

import 'styled-components';
import { theme } from './styles/theme'; // Make sure this path is correct!

// This creates a new type named 'ThemeType' from our theme object.
// TypeScript will automatically know it has .colors, .fonts, etc.
type ThemeType = typeof theme;

// This is the magic. It's a TypeScript feature called "module augmentation".
// It tells TypeScript to merge our ThemeType into the DefaultTheme interface
// from the styled-components library.
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}