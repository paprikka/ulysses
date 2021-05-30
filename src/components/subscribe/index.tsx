import React, {
    ChangeEventHandler,
    FC,
    FormEventHandler,
    useState,
} from 'react'
import './index.css'
import classNames from 'classnames'

type SubStatus = 'idle' | 'active' | 'complete' | 'error'

const emailExpr = /^[^@]+@\w+(\.\w+)+\w$/i

export const Subscribe = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<SubStatus>('idle')

    const isValid = emailExpr.test(email)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        setStatus('active')

        fetch('/api/waiting-list', {
            method: 'post',
            credentials: 'omit',
            body: email,
        })
            .then(() => setStatus('complete'))
            .catch(() => setStatus('idle'))
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setEmail(e.target.value)

    if (status === 'complete') {
        return <div className='subscribe__done'>Thanks! Have this bee: 🐝</div>
    }

    return (
        <form
            className={classNames({
                subscribe: true,
                'subscribe--is-active': status === 'active',
            })}
            onSubmit={handleSubmit}
        >
            <input
                type='email'
                placeholder='me@email.xyz'
                value={email}
                className='subscribe__input'
                onChange={handleInputChange}
            />
            <button
                className='subscribe__submitButton'
                type='submit'
                disabled={!isValid}
            >
                Save
            </button>
        </form>
    )
}
