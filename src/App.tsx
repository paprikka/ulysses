import React, { useReducer } from 'react';
import './App.css';
import { EditorView } from './views/editor'

import { userSettingsReducer, UserSettings } from './reducers/user-settings'
import { Theme } from './components/theme';

const initialState: UserSettings = {
  theme: 'default'
}

function App() {
  const [state, dispatch] = useReducer(userSettingsReducer, initialState)


  return (
    <div className="app">
      <Theme theme={state.theme} />
      <EditorView state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
