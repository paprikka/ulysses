import { useEffect } from 'react'
import { UserSettings } from '../../reducers/user-settings'

export interface SyncProps {
    state: UserSettings
}
export const Sync = ({state}: SyncProps) => {

    useEffect(() => {
        localStorage.setItem('ulysses::user-settings', JSON.stringify(state))
    }, [state])
    
    return null
}