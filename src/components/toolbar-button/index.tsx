import React, { ReactElement } from 'react'
import './index.css'
import { noop } from '../../utils/noop'

export interface ToolbarButtonProps {
    children: ReactElement | ReactElement[]
    onClick?: () => any
    label?: string
}
export const ToolbarButton = ({
    children,
    onClick,
    label,
}: ToolbarButtonProps) => (
    <button
        onClick={onClick || noop}
        aria-label={label}
        className='toolbar-button'
    >
        {children}
    </button>
)
