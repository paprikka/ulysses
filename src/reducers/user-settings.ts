export interface ChangeThemeAction {
    type: 'user:change-theme',
    theme: UserSettingsTheme
}

export type Action = ChangeThemeAction
export type UserSettingsTheme = 'default' | 'dark'

export interface UserSettings {
    theme: UserSettingsTheme
}

const initialState: UserSettings = {
    theme: 'default'
}
export const userSettingsReducer = (state: UserSettings = initialState, action: Action) => {
    switch(action.type) {
        case 'user:change-theme':
            return {...state, theme: action.theme}
        default: return state
    }
}
    