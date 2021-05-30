import React, { Dispatch, useState } from 'react'
import { Action } from '../../reducers/user-settings'
import classNames from 'classnames'
import './index.css'
import logoURL from '../intro/logo.jpg'
import { Subscribe } from '../../components/subscribe'

export interface MobileWarningViewProps {
    dispatch: Dispatch<Action>
}

export const MobileWarningView = ({ dispatch }: MobileWarningViewProps) => {
    const [isExiting, setIsExiting] = useState(false)
    const onExitClick = () => setIsExiting(!isExiting)

    const exit = () => {
        if (isExiting) dispatch({ type: 'user:hide-mobile-support-warning' })
    }

    return (
        <div
            className={classNames({
                'mobile-warning': true,
                'mobile-warning--exiting': isExiting,
            })}
            onAnimationEnd={exit}
        >
            <div className='mobile-warning__content'>
                <header className='mobile-warning__header'>
                    <img src={logoURL} alt='Ensō' />
                </header>
                <p>
                    Hej, Ensō is not available on mobile <em>yet</em>.{' '}
                    <strong>But, I’m working on a mobile-first version.</strong>
                </p>

                <p>
                    Join the waiting list and I’ll message you when the beta
                    comes out:
                </p>

                <div className='mobile-warning__footer'>
                    <Subscribe />
                    <br />
                    <span
                        className='mobile-warning__link'
                        onClick={onExitClick}
                    >
                        Try using the app anyway.
                    </span>
                </div>
            </div>
        </div>
    )
}
