import React, { useState, useEffect, Dispatch } from 'react';
import './index.css';
import { getFilename } from './get-filename'
import { download } from './download'
import { EditorViewPresenter } from './presenter'
import { fromEvent, timer } from 'rxjs'
import { switchMap, mapTo, merge, distinctUntilChanged } from 'rxjs/operators'
import { UserSettings, Action } from '../../reducers/user-settings';

export interface EditorViewProps {
    state: UserSettings,
    dispatch: Dispatch<Action>
}
export const EditorView = ({state, dispatch} : EditorViewProps) => {
    const [isInputFocused, setInputFocused] = useState(true)
    const [isUIVisible, setIsUIVisible] = useState(true)
    const toggleUITimeout = 2000
    const { text, theme } = state

    const setText = (text: string) => dispatch({
        type: 'user:set-text',
        text
    })

    const onInputChange = (value: string) => {
        setText(value)
        if(isUIVisible) setIsUIVisible(false)
    }

    const onDownloadClick = () => download(getFilename(), text)

    const onRemoveClick = () => {
        if(window.confirm('Are you sure you want to remove this note?')) {
            onInputChange('')
        }
    }
    
    const toggleTheme = () =>
        dispatch({
            type: 'user:change-theme',
            theme: state.theme === 'dark' ? 'default' : 'dark'
        })

    useEffect(
        () => {
            const mouseMove$ = fromEvent(document.body, 'mousemove')

            const initialHide$ = timer(toggleUITimeout).pipe( mapTo(false) )
            const hide$ = mouseMove$.pipe(
                switchMap( () => timer(toggleUITimeout) ),
                mapTo(false)
            )
            const show$ = mouseMove$.pipe( mapTo(true) )
            
            const sub = hide$
                .pipe(
                    merge(initialHide$, show$),
                    distinctUntilChanged()
                ).subscribe(setIsUIVisible)

            return () => sub.unsubscribe()
        }, []
    )

    return <EditorViewPresenter
        value={text}
        theme={theme}
        isInputFocused={isInputFocused}
        isUIVisible={isUIVisible}
        
        onChange={onInputChange}
        onDownloadClick={onDownloadClick}
        onRemoveClick={onRemoveClick}
        onToggleThemeClick={toggleTheme}
        onInputFocusedChange={setInputFocused}
    />
}