import React, { ReactElement } from 'react'
import './index.css'
import classNames from 'classnames'

export interface ToolbarProps {
    children: ReactElement | ReactElement[]
    isVisible: boolean
}

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
    children,
    isVisible,
}) => (
    <div
        className={classNames({ toolbar: true, 'toolbar--hidden': !isVisible })}
        children={children}
    />
)
