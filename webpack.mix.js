const mix = require('laravel-mix');
const config = require('./webpack.config');

function resolve(dir) {
    return path.join(
        __dirname,
        '/resources/js',
        dir
    );
}

Mix.listen('configReady', webpackConfig => {
    // Add "svg" to image loader test
    const imageLoaderConfig = webpackConfig.module.rules.find(
        rule =>
            String(rule.test) ===
            String(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/)
    );
    imageLoaderConfig.exclude = resolve('icons');
});

mix.webpackConfig(config);
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('resources/frontend/app.js', 'public/frontend')
    .extract([
        'vue',
        'axios',
        'vuex',
        'vue-router',
    ])
    .copyDirectory('resources/frontend/assets', 'public/frontend/assets');

if (mix.inProduction()) {
    mix.version();
} else {
    // Development settings
    mix
        .sourceMaps()
        .webpackConfig({
            devtool: 'cheap-eval-source-map', // Fastest for development
        });
}
