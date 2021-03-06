import React, { Dispatch, useEffect, useState } from 'react'
import { Action, UserSettings } from '../../reducers/user-settings'
import { Fullscreen } from '../../utils/fullscreen'
import { trackVisits } from '../../utils/track-visits'
import { useFullscreen } from '../../utils/use-fullscreen'
import { download } from './download'
import { getFilename } from './get-filename'
import './index.css'
import { EditorViewPresenter } from './presenter'

export interface EditorViewProps {
    state: UserSettings
    dispatch: Dispatch<Action>
}

export const EditorView = ({ state, dispatch }: EditorViewProps) => {
    const [isInputFocused, setInputFocused] = useState(true)
    const [isUIVisible, setIsUIVisible] = useState(true)
    const [isFullscreen, toggleFullscreen] = useFullscreen(
        Fullscreen.isFullscreen()
    )

    const toggleUITimeout = 2000
    const { text, theme } = state

    const setText = (text: string) =>
        dispatch({
            type: 'user:set-text',
            text,
        })

    const onInputChange = (value: string) => {
        setText(value)
        if (isUIVisible) setIsUIVisible(false)
    }

    const onDownloadClick = () => download(getFilename(), text.trim())

    const onRemoveClick = () => {
        if (window.confirm('Are you sure you want to remove this note?')) {
            onInputChange('')
        }
    }

    const toggleTheme = () =>
        dispatch({
            type: 'user:change-theme',
            theme: state.theme === 'dark' ? 'default' : 'dark',
        })

    useEffect(() => {
        let timer: number
        const update = () => {
            if (timer) window.clearTimeout(timer)
            timer = window.setTimeout(
                () => setIsUIVisible(false),
                toggleUITimeout
            )
            setIsUIVisible(true)
        }
        trackVisits()
        document.body.addEventListener('mousemove', update)
        update()
        return () => document.body.removeEventListener('mousemove', update)
    }, [])

    return (
        <EditorViewPresenter
            value={text}
            theme={theme}
            isInputFocused={isInputFocused}
            isUIVisible={isUIVisible}
            isFullscreen={isFullscreen}
            onChange={onInputChange}
            onDownloadClick={onDownloadClick}
            onRemoveClick={onRemoveClick}
            onToggleThemeClick={toggleTheme}
            onToggleFullscreenClick={toggleFullscreen}
            onInputFocusedChange={setInputFocused}
        />
    )
}
