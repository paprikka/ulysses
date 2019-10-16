import React, { useState } from 'react';
import './index.css';
import { getFilename } from './get-filename'
import { download } from './download'
import { EditorViewPresenter } from './presenter'

const initialText = localStorage.getItem('ulysses::lastText') || ''

const saveChanges = (text: string) => localStorage.setItem('ulysses::lastText', text)


export const EditorView = () => {
    const [text, setText] = useState(initialText)
    const [isInputFocused, setInputFocused] = useState(true)

    const onInputChange = (value: string) => {
        setText(value)
        saveChanges(value)
    }

    const onDownloadClick = () => download(getFilename(), text)

    return <EditorViewPresenter
        value={text}
        isInputFocused={isInputFocused}
        
        onChange={onInputChange}
        onDownloadClick={onDownloadClick}
        onInputFocusedChange={setInputFocused}
    />
}