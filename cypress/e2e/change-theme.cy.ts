describe('change theme', () => {
    it('should be able to click in the theme button and change theme', () => {
        cy.visit('http://localhost:3000/clients')
        cy.get('[id^=theme-button]').click()
        cy.get('[role="menu"]').should('be.visible');
        cy.contains('Light').click();

        cy.wait(2000)
        cy.get('[id^=theme-button]').click()
        cy.get('[role="menu"]').should('be.visible');
        cy.contains('Dark').click();

    })
})