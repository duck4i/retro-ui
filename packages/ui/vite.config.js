import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ["components/**/*", "index.ts", "css.d.ts"],
            rollupTypes: true,
            outDir: 'dist',
        }),
    ],
    css: {
        modules: {
            generateScopedName: 'retro-ui__[name]__[local]__[hash:base64:5]',
            scopeBehaviour: 'local',
            localsConvention: 'camelCase',
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            include: ['components/**/*'],
            formats: ['es', 'cjs'],
            name: 'retro-ui', // Global variable name when used in browser
            fileName: (format) => {
                switch (format) {
                    case 'es':
                        return 'index.mjs'
                    case 'cjs':
                        return 'index.cjs'
                    default:
                        return 'index.js';
                }
            }
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                // Global variables to use in UMD build for externalized deps
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    assetsInclude: ['**/*.ttf'],

})