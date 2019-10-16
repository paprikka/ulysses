import React, { useState, useEffect, useRef } from 'react';
import './index.css';

import { Toolbar } from '../../components/toolbar'
import { ToolbarButton } from '../../components/toolbar-button'
import { Icon } from '../../components/icon';
import { Icons } from '../../components/icons'
import { noop } from '../../utils/noop'

const initialText = localStorage.getItem('ulysses::lastText') || ''
const saveChanges = (text: string) => localStorage.setItem('ulysses::lastText', text)

const getPaddedText = (text: string, linesToAdd: number) => 
    [
        ...new Array(linesToAdd).fill(''),
        text
    ].join('\n')

const getFormattedText = (text = '') => {
    const lines = text.split('\n')
    const lineCount = lines.length
    return lines.length < 5 ? getPaddedText(text, 5 - lineCount) : text
}
const download  = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
    

const preventEvent = (e: React.SyntheticEvent) => e.preventDefault()
const preventSelection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const characterCount = e.currentTarget.value.length

    e.currentTarget.setSelectionRange(characterCount, characterCount)
}

const TypingDetector = ({onStartedTyping = noop}) => {
    useEffect(() => {
        const handleTyping = () => onStartedTyping()
        document.body.addEventListener('keydown', handleTyping)

        return () => document.body.removeEventListener('keydown', handleTyping)
    })

    return null
}
const getFilename = () => {
    const d = new Date()
    const timeString = d.toLocaleTimeString()
    const dateString = d.toLocaleDateString()
    const filename = `notes ${timeString} on ${dateString}.txt`

    return filename
}
export const EditorView = () => {
    const [text, setText] = useState(initialText)
    const [isInputFocused, setInputFocused] = useState(true)

    const inputEl: React.MutableRefObject<HTMLTextAreaElement | null> = useRef(null)

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
        saveChanges(e.currentTarget.value)
    }

    const focus = () => {
        if(inputEl.current === null) return
        inputEl.current.focus()
    }

    useEffect( () => {
        if(inputEl.current === null) return

        const inputElValueLength = inputEl.current.value.length
        inputEl.current.setSelectionRange(inputElValueLength, inputElValueLength)

        inputEl.current.scrollTop = inputEl.current.scrollHeight
    }, [inputEl])

    const onDownloadClick = () => download(getFilename(), text)

    return <div className='editor'>
        <div className="editor__content">
            {
                isInputFocused ? null : <TypingDetector onStartedTyping={focus} />
            }
            <textarea
                onSelect={preventSelection}
                onCopy={preventEvent}
                onPaste={preventEvent}
                onCut={preventEvent}

                onBlur={ () => setInputFocused(false)}
                onFocus={ () => setInputFocused(true)}

                ref={inputEl}
                autoFocus
                className="editor__input"
                placeholder="Start typing..."
                value={getFormattedText(text)}
                onChange={ onInputChange }
            />
        </div>

        <Toolbar>
            <ToolbarButton onClick={onDownloadClick}>
                <Icon source={Icons.save}/>
            </ToolbarButton>
        </Toolbar>
    </div> 
}