import { fetch } from './fetch'

export const trackVisits = () =>
    fetch('/api/hello', {
        // adding so we don't store any cookies
        // I don't want to track anything about you,
        // but I want to know just enough to make improvements in
        // the app.
        credentials: 'omit',
    })
