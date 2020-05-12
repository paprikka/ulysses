import React, { useReducer } from 'react'
import './App.css'
import { EditorView } from './views/editor'

import { userSettingsReducer, defaultState } from './reducers/user-settings'
import { getInitialState } from './reducers/user-settings/get-initial-state'
import { Theme } from './components/theme'
import { Sync } from './components/sync'
import { IntroView } from './views/intro'

const initialState = getInitialState(defaultState)

function App() {
    const [state, dispatch] = useReducer(userSettingsReducer, initialState)

    return (
        <div className='app'>
            <Sync state={state} />
            <Theme theme={state.theme} />
            {state.isIntroVisible ? (
                <IntroView dispatch={dispatch} />
            ) : (
                <EditorView state={state} dispatch={dispatch} />
            )}
        </div>
    )
}

export default App
