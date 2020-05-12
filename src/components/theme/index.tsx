import { useEffect } from 'react'
import './index.css'
import { UserSettingsTheme } from '../../reducers/user-settings'

export interface ThemeProps {
    theme: UserSettingsTheme
}
export const Theme = ({ theme }: ThemeProps) => {
    useEffect(() => {
        document.documentElement.className = `theme--${theme}`
    }, [theme])

    return null
}
