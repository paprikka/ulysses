import React from 'react'
import './index.css'
import { ToolbarButtonProps } from '../toolbar-button'


export interface ToolbarProps { children: React.ReactChildren }

export const Toolbar: React.FunctionComponent<ToolbarButtonProps> = ({children}) =>
    <div className='toolbar' children={children} />