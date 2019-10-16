export interface ChangeThemeAction {
    type: 'user:change-theme',
    theme: UserSettingsTheme
}

export type Action = ChangeThemeAction
export type UserSettingsTheme = 'default' | 'dark'

export interface UserSettings {
    theme: UserSettingsTheme
}

export const userSettingsReducer = (state: UserSettings, action: Action) => {
    switch(action.type) {
        case 'user:change-theme':
            return {...state, theme: action.theme}
        default: return state
    }
}
    