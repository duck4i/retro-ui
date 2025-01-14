const path = require('path');

module.exports = {
    title: "retro-ui",
    styleguideDir: './dist',
    components: '../../packages/ui/components/**/*.{ts,tsx}',
    /*
    sections: [
        {
            name: 'Introduction',
            content: './src/introduction.md',
        },
    ],
    */
    context: {
        App: './App',
        Box: './Box',
        Button: './Button',
        ButtonGroup: './ButtonGroup',
        Text: './Text',
        Window: './Window',
        WindowProvider: './WindowProvider',
    },
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                },
                            },
                        },
                    ],
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
    },
    theme: {
        color: {
            base: "yellow",
            light: 'white',
            lightest: 'white',
            sidebarBackground: "black",
            baseBackground: "black",
            codeBackground: 'black',
            border: 'blue',
            name: 'white',
            type: 'magenta',
            link: '#008400',
            linkHover: 'cyan',
        },
        fontFamily: {
            base: 'monospace'
        },
        borderRadius: 0
    },
    styles: function (theme) {
        return {
            Logo: {
                logo: {
                    color: "yellow"
                }
            },
            SectionHeading: {
                sectionName: {
                    color: 'magenta',
                }
            }
        }
    },
    getComponentPathLine(componentPath) {
        const name = path.basename(componentPath, '.jsx');
        // You can customize this string however you want
        return `import { ${name.split('.')[0]} } from '@duck4i/retro-ui'`;
    },
};