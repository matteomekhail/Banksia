import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: 'resources/js/app.tsx',
                welcome: 'resources/js/Pages/Welcome.tsx',
                // Aggiungi qui altre pagine...
            }
        }
    }
});
