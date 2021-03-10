module.exports = {
    globDirectory: 'build',
    globPatterns: [
        '**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest,map}',
    ],
    swDest: 'build/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
}
