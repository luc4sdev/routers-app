describe('show router details', () => {
    it('should be able to click in router details button and show router details', () => {
        cy.visit('http://localhost:3000/routers')
        cy.contains('Ver detalhes do roteador').click();

        cy.get('[role="dialog"]').should('be.visible');
    })
})