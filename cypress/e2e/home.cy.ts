describe('home', () => {
    it('hello from nuxt - home', () => {
        cy.visit('/')

        cy.contains('h1', 'Books Store')
    })
})
