// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createOng', () => {
  cy.request({
    method: 'POST',
    url: 'https://3333-indigo-kite-s2x3i5vs.ws-us16.gitpod.io/ongs',
    body: {
      'name': 'Dogs queridos',
      'email': 'dogs@mail.com',
      'whatsapp': '51999999',
      'city': 'Porto Alegre',
      'uf': 'RS'
    },
  }).then((response) => {
    expect(response.body.id).is.not.null;
    Cypress.env('createOngId', response.body.id);
  });
});

Cypress.Commands.add('createIncident', () => {
  cy.request({
    method: 'POST',
    url: 'https://3333-indigo-kite-s2x3i5vs.ws-us16.gitpod.io/incidents',
    headers: { 'Authorization': Cypress.env('createOngId') },
    body: {
      'title': 'Animal faminto',
      'description': 'Animal precisa de apoio para ter um alimento.',
      'value': 500,
    },
  }).then((response) => {
    expect(response.body.id).is.not.null;
    Cypress.env('createIncidentId', response.body.id);
  });
});

Cypress.Commands.add('login', () => {
  cy.visit('https://3000-indigo-kite-s2x3i5vs.ws-us16.gitpod.io/profile', {
    onBeforeLoad(win) {
      win.localStorage.setItem('ongId', Cypress.env('createOngId'));
      win.localStorage.setItem('ongName', 'Dogs queridos');
    }
  });
});
