import React, { FC, useEffect, useState } from 'react'
import './index.css'

import classnames from 'classnames'

// type ToastViewState = 'hidden' | 'active' | 'entering' | 'exiting'

type ToastShowEvent = CustomEvent<{ text: string }>

export const Toast: FC = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [content, setContent] = useState('')

    useEffect(() => {
        const onToastShow = (e: ToastShowEvent) => {
            setIsVisible(true)
            setContent(e.detail.text)
        }
        // https://github.com/Microsoft/TypeScript/issues/28357
        document.addEventListener('toast:show', onToastShow as EventListener)

        return () =>
            document.removeEventListener(
                'toast:show',
                onToastShow as EventListener
            )
    }, [])

    useEffect(() => {
        if (!isVisible) return
        const timer = setTimeout(() => setIsVisible(false), 2000)

        return () => clearTimeout(timer)
    }, [isVisible, content])

    return (
        <div
            className={classnames({
                toast: true,
                'toast--visible': isVisible,
            })}
        >
            {content}
        </div>
    )
}

export const showToast = (text: string) => {
    document.dispatchEvent(new CustomEvent('toast:show', { detail: { text } }))
}
