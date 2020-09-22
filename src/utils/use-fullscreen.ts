import { useEffect, useState } from 'react'
import { Fullscreen } from './fullscreen'

export const useFullscreen = (
    initialFullscreenValue: boolean
): [boolean, () => void] => {
    const [isFullscreen, setFullscreen] = useState(initialFullscreenValue)

    const toggleFullscreen = () => {
        if (isFullscreen) {
            Fullscreen.exit()
        } else {
            Fullscreen.request()
        }
    }
    useEffect(() => {
        Fullscreen.onChange(() => {
            const currentIsFullscreen = Fullscreen.isFullscreen()
            if (currentIsFullscreen === isFullscreen) return

            setFullscreen(currentIsFullscreen)
        })
    })

    return [isFullscreen, toggleFullscreen]
}
