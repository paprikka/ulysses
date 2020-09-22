import { document as documentUntyped } from './document'
import { Fullscreen, FullscreenAPI } from './fullscreen'
jest.mock('./document', () => ({
    document: {
        documentElement: {},
    },
    addEventListener: jest.fn(),
}))

const document = documentUntyped as FullscreenAPI

beforeEach(() => {
    Object.keys(document).forEach((k) => delete (document as any)[k])
    document.documentElement = {}
})

it('should return the correct isFullscreen value', () => {
    ;(document.fullscreenElement as any) = 'mock: fullscreenElement'
    expect(Fullscreen.isFullscreen()).toBe(true)
    ;(document.fullscreenElement as any) = null
    ;(document as any).webkitFullscreenElement = 'mock: fullscreenElement'
    expect(Fullscreen.isFullscreen()).toBe(true)
    ;(document as any).webkitFullscreenElement = null
    expect(Fullscreen.isFullscreen()).toBe(false)
})

it('should request fullscreen', () => {
    document.documentElement.requestFullscreen = jest.fn()
    Fullscreen.request()
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled()

    document.documentElement = {
        webkitRequestFullscreen: jest.fn(),
    }
    Fullscreen.request()
    expect(document.documentElement.webkitRequestFullscreen).toHaveBeenCalled()

    document.documentElement = {}
    expect(() => Fullscreen.request()).toThrow(
        new Error('Fullscreen not supported')
    )
})

it('should exit fullscreen', () => {
    document.exitFullscreen = jest.fn()
    Fullscreen.exit()
    expect(document.exitFullscreen).toHaveBeenCalled()

    document.exitFullscreen = undefined
    document.webkitExitFullscreen = jest.fn()
    Fullscreen.exit()
    expect(document.webkitExitFullscreen).toHaveBeenCalled()

    document.webkitExitFullscreen = undefined
    expect(() => Fullscreen.exit()).toThrow(
        new Error('Fullscreen not supported')
    )
})

it('should listen to fullscreen status changes', () => {
    const mockListenerFn = (eventName: string, handler: (arg: any) => void) =>
        handler({ eventName })

    document.onfullscreenchange = jest.fn()
    document.addEventListener = mockListenerFn
    const onChange = jest.fn()
    Fullscreen.onChange(onChange)
    expect(onChange).toHaveBeenCalledWith({ eventName: 'fullscreenchange' })

    delete document.onfullscreenchange
    document.onwebkitfullscreenchange = jest.fn()

    const webkitOnChange = jest.fn()
    Fullscreen.onChange(webkitOnChange)
    expect(webkitOnChange).toHaveBeenCalledWith({
        eventName: 'webkitfullscreenchange',
    })

    document.addEventListener = jest.fn()
    delete document.onwebkitfullscreenchange
    Fullscreen.onChange(webkitOnChange)

    expect(document.addEventListener).not.toHaveBeenCalled()
})
