const {resolve} = require('path');

module.exports = {
    pwa: {
        name: 'KhidmatBD',
        themeColor: '#3d7fff',
        msTileColor: '#ffffff'
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
        }
    }
};
