import { document } from './document'

export type FullscreenAPI = {
    documentElement: {
        requestFullscreen?: typeof document.documentElement.requestFullscreen
        webkitRequestFullscreen?: typeof document.documentElement.requestFullscreen
    }

    exitFullscreen?: typeof document.exitFullscreen
    webkitExitFullscreen?: typeof document.exitFullscreen

    fullscreenElement?: typeof document.fullscreenElement
    webkitFullscreenElement?: typeof document.fullscreenElement

    addEventListener: typeof document.addEventListener
    onfullscreenchange?: typeof document.onfullscreenchange
    onwebkitfullscreenchange?: typeof document.onfullscreenchange
}

const doc = document as FullscreenAPI

const getDefaultException = () => {
    throw new Error('Fullscreen not supported')
}

export const Fullscreen = {
    request: () => {
        if (doc.documentElement.requestFullscreen)
            return doc.documentElement.requestFullscreen()
        if (doc.documentElement.webkitRequestFullscreen)
            return doc.documentElement.webkitRequestFullscreen()

        throw getDefaultException()
    },

    exit: () => {
        if (doc.exitFullscreen) return doc.exitFullscreen()
        if (doc.webkitExitFullscreen) return doc.webkitExitFullscreen()

        throw getDefaultException()
    },

    isFullscreen: () =>
        Boolean(doc.fullscreenElement || doc.webkitFullscreenElement),

    onChange: (fn: () => void) => {
        if ('onfullscreenchange' in doc)
            return doc.addEventListener('fullscreenchange', fn)
        if ('onwebkitfullscreenchange' in doc)
            return doc.addEventListener('webkitfullscreenchange', fn)
    },
}
