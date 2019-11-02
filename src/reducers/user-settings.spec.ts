import { userSettingsReducer, UserSettings, ChangeThemeAction, SetTextAction, HideIntroAction } from './user-settings'

const getState: () => UserSettings = () => ({
    theme: 'default',
    text: '',
    isIntroVisible: true
  })

it('should change the theme', () => {
    const action:ChangeThemeAction  = { theme: 'dark', type: 'user:change-theme' }
    const state = getState()
    expect(
        userSettingsReducer(state, action)
    ).toEqual({
        ...state,
        theme: 'dark',
    })
})

it('should change the text', () => {
    const action: SetTextAction  = { type: 'user:set-text', text: 'new value' }
    const state = getState()
    expect(
        userSettingsReducer(state, action)
    ).toEqual({
        ...state,
        text: 'new value',
    })
})

it('should hide the intro', () => {
    const action: HideIntroAction  = { type: 'user:hide-intro' }
    const state = getState()
    expect(
        userSettingsReducer(state, action)
    ).toEqual({
        ...state,
        isIntroVisible: false
    })
})