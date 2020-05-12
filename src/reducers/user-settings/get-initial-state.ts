import { UserSettings } from '.'

export const getInitialState = (defaultState: UserSettings) => {
    const json = localStorage.getItem('ulysses::user-settings')
    if (!json) return defaultState

    try {
        const state = JSON.parse(json)
        return state
    } catch (err) {
        return defaultState
    }
}
