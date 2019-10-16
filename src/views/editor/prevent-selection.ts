import React from 'react'

export const preventSelection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const characterCount = e.currentTarget.value.length

    e.currentTarget.setSelectionRange(characterCount, characterCount)
}
