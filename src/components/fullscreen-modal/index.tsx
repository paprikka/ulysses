import React from 'react'
import './index.css'

export const FullscreenModal = () => (
    <dialog open>
        <p>Do you really want to close?</p>
        <form method='dialog'>
            <button value={'close'}>Ok</button>
            <button value={'cancel'}>cancel</button>
        </form>
    </dialog>
)
