it('should allow user to edit and save text', () => {
    cy.visit('http://localhost:3000')

    cy.get('[aria-label="Start"]').click()

    cy.get('[data-testid="editor-input"]')
        .should('be.focused')
        .type('Hello world')

    cy.get('[data-testid="editor-input"]').should(
        'have.value',
        '\n\n\n\nHello world'
    )

    cy.reload()

    cy.get('[data-testid="editor-input"]').should(
        'have.value',
        '\n\n\n\nHello world'
    )
})
