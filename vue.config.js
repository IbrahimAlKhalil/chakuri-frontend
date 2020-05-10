const path = require('path');
const {resolve} = path;
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

const template = process.env.TARGET_PLATFORM === 'android' ? 'cordova.html' : 'index.html';

const configuration = {
    outputDir: 'www',
    transpileDependencies: [
        /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
    ],
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: `public/${template}`,
            // output as dist/index.html
            filename: 'index.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        admin: {
            // entry for the page
            entry: 'src/admin/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'admin.html',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        },
    },

    pwa: {
        name: 'KhidmatBD',
        themeColor: '#ee6305',
        msTileColor: '#ffffff',
    },

    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@components': resolve(__dirname, 'src/components'),
                '@locales': resolve(__dirname, 'src/locales'),
                '@middleware': resolve(__dirname, 'src/middleware'),
                '@modules': resolve(__dirname, 'src/modules'),
                '@pages': resolve(__dirname, 'src/pages'),
                '@styles': resolve(__dirname, 'src/styles'),
            },
        },
        optimization: {
            usedExports: true,
        },
        plugins: [
            // CKEditor needs its own plugin to be built using webpack.
            new CKEditorWebpackPlugin({
                // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                language: 'en',
            }),
        ],
    },

    chainWebpack: config => {
        // (1.) To handle editor icons, get the default rule for *.svg files first:
        const svgRule = config.module.rule('svg');

        // Then you can either:
        //
        // * clear all loaders for existing 'svg' rule:
        //
        //		svgRule.uses.clear();
        //
        // * or exclude ckeditor directory from node_modules:
        svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

        // Add an entry for *.svg files belonging to CKEditor. You can either:
        //
        // * modify the existing 'svg' rule:
        //
        //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
        //
        // * or add a new one:
        config.module
            .rule('cke-svg')
            .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
            .use('raw-loader')
            .loader('raw-loader');

        // (2.) Transpile the .css files imported by the editor using PostCSS.
        // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
        config.module
            .rule('cke-css')
            .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
            .use('postcss-loader')
            .loader('postcss-loader')
            .tap(() => {
                return styles.getPostCssConfig({
                    themeImporter: {
                        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                    },
                    minify: true,
                });
            });
    },
};

if (process.env.TARGET_PLATFORM === 'android') {
    configuration.publicPath = './';
}

module.exports = configuration;
