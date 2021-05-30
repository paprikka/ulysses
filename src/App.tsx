import React, { useReducer } from 'react'
import './App.css'
import { EditorView } from './views/editor'

import { userSettingsReducer, defaultState } from './reducers/user-settings'
import { getInitialState } from './reducers/user-settings/get-initial-state'
import { Theme } from './components/theme'
import { Sync } from './components/sync'
import { IntroView } from './views/intro'
import { MobileWarningView } from './views/mobile-warning'

const initialState = getInitialState(defaultState)

function App() {
    const [state, dispatch] = useReducer(userSettingsReducer, initialState)

    const getView = () => {
        if (state.isMobileSupportWarningVisible)
            return <MobileWarningView dispatch={dispatch} />
        if (state.isIntroVisible) return <IntroView dispatch={dispatch} />
        return <EditorView state={state} dispatch={dispatch} />
    }

    return (
        <div className='app'>
            <Sync state={state} />
            <Theme theme={state.theme} />
            {getView()}
        </div>
    )
}

export default App
