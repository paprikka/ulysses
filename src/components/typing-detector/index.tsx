import { useEffect } from 'react'

import { noop } from '../../utils/noop'

export const TypingDetector = ({ onStartedTyping = noop }) => {
    useEffect(() => {
        const handleTyping = () => onStartedTyping()
        document.body.addEventListener('keydown', handleTyping)

        return () => document.body.removeEventListener('keydown', handleTyping)
    })

    return null
}
