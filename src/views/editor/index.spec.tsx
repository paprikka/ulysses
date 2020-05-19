import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { defaultState, UserSettings } from '../../reducers/user-settings'
import { EditorView } from '.'

import { download } from './download'
import { getFilename } from './get-filename'

jest.mock('./download', () => ({
    download: jest.fn(),
}))

jest.mock('./get-filename', () => ({
    getFilename: jest.fn().mockReturnValue('filename.txt'),
}))

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

it('should render an empty container and a placeholder if no saved text is present', () => {
    const state = { ...defaultState }
    const dispatch = () => {}
    const { getByTestId, getByPlaceholderText } = render(
        <EditorView dispatch={dispatch} state={state} />
    )

    expect(getByTestId('editor-content')).toHaveTextContent('')
    expect(getByPlaceholderText('Start typing...')).toBeTruthy()
})

it('should render text if saved text is present', () => {
    const state: UserSettings = {
        ...defaultState,
        text: 'Hello dankness my moist friend',
    }
    const dispatch = () => {}
    const { getByTestId } = render(
        <EditorView dispatch={dispatch} state={state} />
    )

    expect(getByTestId('editor-content')).toHaveTextContent(
        'Hello dankness my moist friend'
    )
})

it('should allow user to download notes', () => {
    // TODO: fix annotations
    const state: UserSettings = {
        ...defaultState,
        text: `



example text`,
    }
    const dispatch = () => {}
    const { getByLabelText } = render(
        <EditorView dispatch={dispatch} state={state} />
    )

    const downloadButton = getByLabelText('Download notes')
    expect(downloadButton).toBeTruthy()

    fireEvent.click(downloadButton)

    expect(download).toHaveBeenCalledTimes(1)
    expect(download).toHaveBeenCalledWith('filename.txt', 'example text')
    expect(getFilename).toHaveBeenCalledWith()
})
