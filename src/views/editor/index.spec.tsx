import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { defaultState, UserSettings } from '../../reducers/user-settings'
import { EditorView } from '.'

afterEach(cleanup)

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
