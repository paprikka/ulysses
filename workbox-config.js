module.exports = {
    globDirectory: 'public',
    globPatterns: [
        '**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest,map}',
    ],
    swDest: 'public/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
}
