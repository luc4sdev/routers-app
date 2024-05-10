describe('show client details', () => {
    it('should be able to click in client details button and show client details', () => {
        cy.visit('http://localhost:3000/clients')
        cy.contains('Ver detalhes do cliente').click();

        cy.get('[role="dialog"]').should('be.visible');
    })
})