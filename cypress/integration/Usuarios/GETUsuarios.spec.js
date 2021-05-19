describe('GIVEN the user API', () => {
    context('WHEN I send a GET to the /Usuarios endpoint', () => {
        it('THEN It should return a list of Users', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/Usuarios'
            })
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.quantidade).to.eq(response.body.usuarios.length)
                Cypress._.each(response.body.usuarios, (usuario) => {
                    expect(usuario.nome).to.not.be.null
                    expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
                })
            })
        })
    })

    context('WHEN I send a GET using the query param ID', () => {
        it('THEN It should return the filtered user', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/Usuarios',
                qs: {
                    _id: "0uxuPY0cbmQhpEz1"
                }
            })
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body.quantidade).to.eq(response.body.usuarios.length)
                expect(response.body.usuarios[0].nome).to.eq('Fulano da Silva')
            })
        })
    })
})