import React, { useState, useEffect } from 'react';
import './index.css';
import { getFilename } from './get-filename'
import { download } from './download'
import { EditorViewPresenter } from './presenter'
import { fromEvent, timer } from 'rxjs'
import { switchMap, mapTo, merge, distinctUntilChanged } from 'rxjs/operators'

const initialText = localStorage.getItem('ulysses::lastText') || ''

const saveChanges = (text: string) => localStorage.setItem('ulysses::lastText', text)


export const EditorView = () => {
    const [text, setText] = useState(initialText)
    const [isInputFocused, setInputFocused] = useState(true)
    const [isUIVisible, setIsUIVisible] = useState(true)
    const toggleUITimeout = 2000 

    const onInputChange = (value: string) => {
        setText(value)
        saveChanges(value)
        if(isUIVisible) setIsUIVisible(false)
    }

    const onDownloadClick = () => download(getFilename(), text)

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
        isInputFocused={isInputFocused}
        isUIVisible={isUIVisible}
        
        onChange={onInputChange}
        onDownloadClick={onDownloadClick}
        onInputFocusedChange={setInputFocused}
    />
}