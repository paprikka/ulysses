export interface ChangeThemeAction {
    type: 'user:change-theme',
    theme: UserSettingsTheme
}

export interface SetTextAction {
    type: 'user:set-text',
    text: string
}


export type Action = ChangeThemeAction | SetTextAction
export type UserSettingsTheme = 'default' | 'dark'

export interface UserSettings {
    theme: UserSettingsTheme,
    text: string
}

export const userSettingsReducer = (state: UserSettings, action: Action) => {
    switch(action.type) {
        case 'user:change-theme':
            return {...state, theme: action.theme}
        case 'user:set-text':
            return {...state, text: action.text}
        default: return state
    }
}
    