import React, { useReducer } from 'react';
import './App.css';
import { EditorView } from './views/editor'

import { userSettingsReducer, UserSettings } from './reducers/user-settings'
import { Theme } from './components/theme';
import { Sync } from './components/sync';

const defaultState: UserSettings = {
  theme: 'default',
  text: ''
}

const getInitialState = (defaultState: UserSettings) => {
  const json = localStorage.getItem('ulysses::user-settings')
  if(!json) return defaultState

  try {
    const state = JSON.parse(json)
    return state
  } catch (err) {
    return defaultState
  }
}

const initialState = getInitialState(defaultState)

function App() {
  const [state, dispatch] = useReducer(userSettingsReducer, initialState)


  return (
    <div className="app">
      <Sync state={state} />
      <Theme theme={state.theme} />
      <EditorView state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
