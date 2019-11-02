import { useEffect, useState } from 'react'

export const useFullscreen = (initialFullscreenValue: boolean): [boolean, () => void] => {
    const [isFullscreen, setFullscreen] = useState(initialFullscreenValue)

    const toggleFullscreen = () => {
        if(isFullscreen) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }
    useEffect(
        () => {
            document.addEventListener('fullscreenchange', e => {
                const currentIsFullscreen = !!document.fullscreenElement
                if(currentIsFullscreen === isFullscreen) return;

                setFullscreen(currentIsFullscreen)
            })
        }
    )

    return [
        isFullscreen, toggleFullscreen
    ]
}