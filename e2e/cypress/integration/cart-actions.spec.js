/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Look at cheese dialogue', () => {
    cy.contains('ADELOST').click();

    cy.contains('ADELOST').should('exist');
    cy.contains('Description:').should('exist');
    cy.contains('Category: semi-soft, blue-veined').should('exist');
    cy.contains('Price: $367.55').should('exist');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');
    cy.get('[data-cy=badge-count]').click();

    cy.get('[data-cy=purchase-button]').click();
    cy.contains('Items Purchased').should('exist');

  })

})
