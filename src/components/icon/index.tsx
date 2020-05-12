import React from 'react'
import './index.css'

// TODO: optimise for redraws/updates
export interface IconProps {
    source: string
}
export const Icon = ({ source }: IconProps) => (
    <span className='icon' style={{ backgroundImage: `url(${source})` }} />
)
