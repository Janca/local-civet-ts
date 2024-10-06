const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            css: process.env.MODE_ENV === 'production' ? {
                modules: { // obscurity through renaming
                    auto: () => false,
                    localIdentName: 'fk-[hash:8]'
                }
            } : undefined
        }
    },
    outputDir: 'docs',
    publicPath:"/local-civet-ts"
})
