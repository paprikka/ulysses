import { useEffect, useRef } from 'react'

const noop = () => {}
export const useClipboardCopy = (
    text: string,
    onCopiedToClipboard?: () => void
) => {
    const textRef = useRef<string>()

    // No need to set up new listeners on every key press, so we're using a ref
    useEffect(() => {
        textRef.current = text
    }, [text])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const hasMetaOrControl = e.metaKey || e.ctrlKey
            if (!(hasMetaOrControl && e.code === 'KeyC')) return
            if (!textRef.current) return
            if (typeof navigator.clipboard.writeText !== 'function') return
            navigator.clipboard
                .writeText(textRef.current.trim())
                .then(onCopiedToClipboard || noop)
                .catch((error) =>
                    console.log('Cannot access clipboard.', error)
                )
        }
        document.body.addEventListener('keydown', onKeyDown)

        return () => document.body.removeEventListener('keydown', onKeyDown)
    }, [textRef])
}
