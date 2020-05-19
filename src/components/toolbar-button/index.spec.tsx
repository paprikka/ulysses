import React from 'react'
import { ToolbarButton } from '.'
import { render, fireEvent } from '@testing-library/react'

it('should render children', () => {
    const { getByText } = render(
        <ToolbarButton>
            <div>child component</div>
        </ToolbarButton>
    )

    expect(getByText('child component')).toBeTruthy()
})

it('should render children', () => {
    const { getByLabelText } = render(
        <ToolbarButton label='button test'>
            <div>child component</div>
        </ToolbarButton>
    )

    expect(getByLabelText('button test')).toBeTruthy()
})

it('should fire onClick', () => {
    const onClick = jest.fn()

    const { getByLabelText } = render(
        <ToolbarButton label='button test' onClick={onClick}>
            <div>child component</div>
        </ToolbarButton>
    )

    expect(onClick).not.toHaveBeenCalled()

    const button = getByLabelText('button test')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
})
