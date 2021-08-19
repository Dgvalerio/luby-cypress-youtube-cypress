/// <reference types="cypress" />

describe('Ongs', () => {
  it('Devem poder realizar um cadastro', () => {
    // .visit() -> Visita um site
    cy.visit('https://3000-indigo-kite-s2x3i5vs.ws-us16.gitpod.io/register');

    // .get() -> Busca um elemento
    // .type() -> Insere um texto
    cy.get('[data-cy=name]').type('Dogs queridos')
    cy.get('[data-cy=email]').type('dogs@mail.com')
    cy.get('[data-cy=whatsapp]').type('51999999999')
    cy.get('[data-cy=city]').type('Porto Alegre')
    cy.get('[data-cy=uf]').type('RS')

    // routing
    // cy.server() -> Iniciar um servidor
    cy.server();

    // cy.route() -> Criar uma rota
    // cy.as() -> Atribui um alias
    cy.route('POST', '**/ongs').as('postOng');

    cy.get('[data-cy=submit]').click();

    // cy.wait() -> Esperar algo
    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it('Devem poder realizar um login no sistema', () => {

  });
})
