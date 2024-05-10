describe('go to routers page', () => {
  it('should be able to click in routers link and go to routers page', () => {
    cy.visit('http://localhost:3000/clients')
    cy.get('a[href^="/routers"]').click({ force: true })
    cy.location('pathname').should('include', '/routers')
  })
})