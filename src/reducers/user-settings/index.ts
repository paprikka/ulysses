import { getIsMobile } from '../../utils/is-mobile'

export interface ChangeThemeAction {
    type: 'user:change-theme'
    theme: UserSettingsTheme
}

export interface SetTextAction {
    type: 'user:set-text'
    text: string
}

export interface HideIntroAction {
    type: 'user:hide-intro'
}
export interface HideMobileSupportWarningAction {
    type: 'user:hide-mobile-support-warning'
}

export type Action =
    | ChangeThemeAction
    | SetTextAction
    | HideIntroAction
    | HideMobileSupportWarningAction
export type UserSettingsTheme = 'default' | 'dark'

export interface UserSettings {
    theme: UserSettingsTheme
    text: string
    isIntroVisible: boolean
    isMobileSupportWarningVisible: boolean
}

export const getDefaultState = (): UserSettings => ({
    theme: 'default',
    text: '',
    isIntroVisible: true,
    isMobileSupportWarningVisible: getIsMobile(), // TODO: add platform detection
})

export const defaultState: UserSettings = getDefaultState()

export const userSettingsReducer = (state: UserSettings, action: Action) => {
    switch (action.type) {
        case 'user:change-theme':
            return { ...state, theme: action.theme }
        case 'user:set-text':
            return { ...state, text: action.text }
        case 'user:hide-intro':
            return { ...state, isIntroVisible: false }
        case 'user:hide-mobile-support-warning':
            return { ...state, isMobileSupportWarningVisible: false }
        default:
            return state
    }
}
