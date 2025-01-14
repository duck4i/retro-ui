const path = require('path');

module.exports = {
    title: "@duck4i/retro-ui",
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
                    use: ['style-loader', 'css-loader'], // Add loaders for CSS
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
    }
};