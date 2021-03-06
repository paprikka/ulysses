import React, { Dispatch, useState } from 'react'
import { Action } from '../../reducers/user-settings'
import classNames from 'classnames'
import './index.css'
import logoURL from './logo.jpg'

export interface IntroViewProps {
    dispatch: Dispatch<Action>
}

export const IntroView = ({ dispatch }: IntroViewProps) => {
    const [isExiting, setIsExiting] = useState(false)
    const onExitClick = () => setIsExiting(!isExiting)

    const exit = () => {
        if (isExiting) dispatch({ type: 'user:hide-intro' })
    }

    return (
        <div
            className={classNames({ intro: true, 'intro--exiting': isExiting })}
            onAnimationEnd={exit}
        >
            <div className='intro__content'>
                <header className='intro__header'>
                    <img src={logoURL} alt='Ensō' />
                </header>
                <p>
                    Write. Don’t edit.
                    <br />
                    Let your thoughts flow freely.
                </p>

                <p>
                    Your every keystroke is saved, but I can’t see it. <br />
                    Next time you come, I won’t be here.
                </p>

                <div className='intro__footer'>
                    <button
                        aria-label='Start'
                        onClick={onExitClick}
                        className='intro__cta'
                    >
                        Start writing
                    </button>
                    <br />
                    <a
                        href='https://sonnet.io/posts/ulysses'
                        target='_blank'
                        className='intro__link'
                    >
                        Learn more
                    </a>
                </div>
            </div>
        </div>
    )
}
