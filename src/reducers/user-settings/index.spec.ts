import { mocked } from 'ts-jest/utils'
import {
    userSettingsReducer,
    UserSettings,
    ChangeThemeAction,
    SetTextAction,
    HideIntroAction,
    HideMobileSupportWarningAction,
    getDefaultState,
} from '.'

import { getIsMobile } from '../../utils/is-mobile'
jest.mock('../../utils/is-mobile', () => ({
    getIsMobile: jest.fn().mockReturnValue(false),
}))

const getState = (overrides: Partial<UserSettings> = {}): UserSettings => ({
    theme: 'default',
    text: '',
    isIntroVisible: true,
    isMobileSupportWarningVisible: false,
    ...overrides,
})

it('should change the theme', () => {
    const action: ChangeThemeAction = {
        theme: 'dark',
        type: 'user:change-theme',
    }
    const state = getState()
    expect(userSettingsReducer(state, action)).toEqual({
        ...state,
        theme: 'dark',
    })
})

it('should change the text', () => {
    const action: SetTextAction = { type: 'user:set-text', text: 'new value' }
    const state = getState()
    expect(userSettingsReducer(state, action)).toEqual({
        ...state,
        text: 'new value',
    })
})

it('should hide the intro', () => {
    const action: HideIntroAction = { type: 'user:hide-intro' }
    const state = getState()
    expect(userSettingsReducer(state, action)).toEqual({
        ...state,
        isIntroVisible: false,
    })
})

it('should hide mobile support warning', () => {
    const action: HideMobileSupportWarningAction = {
        type: 'user:hide-mobile-support-warning',
    }
    const state = getState({ isMobileSupportWarningVisible: true })
    expect(userSettingsReducer(state, action)).toEqual({
        ...state,
        isMobileSupportWarningVisible: false,
    })
})

describe('getDefaultState()', () => {
    it('should return the default state', () => {
        expect(getDefaultState()).toMatchInlineSnapshot(`
            Object {
              "isIntroVisible": true,
              "isMobileSupportWarningVisible": false,
              "text": "",
              "theme": "default",
            }
        `)
    })

    it('should return isMobileSupportWarningVisible === false for non-mobile browsers', () => {
        mocked(getIsMobile).mockReturnValueOnce(true)
        expect(getDefaultState().isMobileSupportWarningVisible).toBe(true)

        mocked(getIsMobile).mockReturnValueOnce(false)
        expect(getDefaultState().isMobileSupportWarningVisible).toBe(false)
    })
})
