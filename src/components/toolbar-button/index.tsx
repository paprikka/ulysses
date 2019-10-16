import React, { ReactElement } from 'react'
import './index.css'
import { noop } from '../../utils/noop'

export interface ToolbarButtonProps {
    children: ReactElement | ReactElement[],
    onClick?: () => any
}
export const ToolbarButton = ({children, onClick} : ToolbarButtonProps) => 
    <button
        onClick={onClick || noop}
        className='toolbar-button'>
        { children }
    </button>