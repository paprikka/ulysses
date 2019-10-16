import React, { useReducer } from 'react';
import './App.css';
import { EditorView } from './views/editor'

import { userSettingsReducer } from './reducers/user-settings'
import { Theme } from './components/theme';

function App() {
  const [state, dispatch] = useReducer(userSettingsReducer, { theme: 'dark' })


  return (
    <div className="app">
      <Theme theme={state.theme} />
      <EditorView state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
