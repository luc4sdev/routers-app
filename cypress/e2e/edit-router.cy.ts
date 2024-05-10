describe('edit router', () => {
    it('should be able to click in router details button and click in edit button', () => {
        cy.visit('http://localhost:3000/routers')
        cy.contains('Ver detalhes do roteador').click();

        cy.get('[role="dialog"]').should('be.visible');

        cy.contains('Editar').click()
    })
})