describe('go to clients page', () => {
  it('should be able to click in clients link and go to clients page', () => {
    cy.visit('http://localhost:3000/routers')
    cy.get('a[href^="/clients"]').first().click({ force: true })
    cy.location('pathname').should('include', '/clients')
  })
})