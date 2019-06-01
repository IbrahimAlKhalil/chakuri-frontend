const {resolve} = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    pwa: {
        name: 'Chakuri',
        themeColor: 'teal',
        msTileColor: 'teal'
    },
    chainWebpack: config => {
        config.module
            .rule('i18n')
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use('i18n')
            .loader('@kazupon/vue-i18n-loader')
            .end();
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
                '@styles': resolve(__dirname, 'src/styles')
            }
        },
        optimization: {
            usedExports: true
        },
        plugins: [new BundleAnalyzerPlugin]
    }
};
