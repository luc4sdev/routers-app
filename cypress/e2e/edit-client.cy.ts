describe('edit client', () => {
    it('should be able to click in client details button and click in edit button', () => {
        cy.visit('http://localhost:3000/clients')
        cy.contains('Ver detalhes do cliente').click();

        cy.get('[role="dialog"]').should('be.visible');

        cy.contains('Editar').click()
    })
})