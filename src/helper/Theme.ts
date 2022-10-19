import { createContext } from 'react';
export const ThemeList = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
}

export const ThemeContext = createContext({
    theme: ThemeList.dark,
    toggleTheme: () => {},
});