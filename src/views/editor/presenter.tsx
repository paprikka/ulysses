import React, { useRef, useEffect } from 'react'
import { TypingDetector } from '../../components/typing-detector'
import { preventSelection } from './prevent-selection'
import { Toolbar } from '../../components/toolbar'
import { ToolbarButton } from '../../components/toolbar-button'
import { Icon } from '../../components/icon';
import { Icons } from '../../components/icons'
import classNames from 'classnames'

const preventEvent = (e: React.SyntheticEvent) => e.preventDefault()

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

interface EditorViewPresenterProps {
    value: string,
    isInputFocused: boolean,
    onInputFocusedChange: (isFocused: boolean) => void,
    onChange: (text: string) => void,
    onDownloadClick: () => void,
    isUIVisible: boolean
}
export const EditorViewPresenter = ({
    value,
    isInputFocused,
    onChange,
    onInputFocusedChange,
    onDownloadClick,
    isUIVisible
} : EditorViewPresenterProps) => {
    const inputEl: React.MutableRefObject<HTMLTextAreaElement | null> = useRef(null)

    const wordCount = value.trim().split(/\s+/).length
    
    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange(e.currentTarget.value)

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

                onBlur={ () => onInputFocusedChange(false)}
                onFocus={ () => onInputFocusedChange(true)}

                ref={inputEl}
                autoFocus
                className="editor__input"
                placeholder="Start typing..."
                value={getFormattedText(value)}
                onChange={ onInputChange }
            />
        </div>
        <span className={classNames({
            'editor__word-count': true,
            'editor__word-count--active': isUIVisible
        })}>{wordCount}</span>
        <Toolbar isVisible={isUIVisible}>
            <ToolbarButton onClick={onDownloadClick}>
                <Icon source={Icons.save}/>
            </ToolbarButton>
        </Toolbar>
    </div> 
}
 