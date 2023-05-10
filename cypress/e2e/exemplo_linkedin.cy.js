/// <reference types="cypress"/>

describe('Criando cenário de teste para o site Linkedin', () => {

    it('Caso de teste: tentiva de logar com username invalido', () =>{
        telaDeLogin()
        cy.get('#username').type("email Invalido")
        cy.get('.btn__primary--large').click()
        cy.get('#error-for-username').should("have.text", 'Please enter a valid username')

    })

    it('Caso de teste: tentiva de login com uma senha invalida', () =>{
        telaDeLogin()
        cy.get('#username').type("guigrubba@gmail.com")
        cy.get('#password').type("senha invalida")
        cy.get('.btn__primary--large').click()
        cy.get('#error-for-password').should('contain.text', 'That\'s not the right password.');
    })

    it('Caso de teste: cadastrando um e-mail invalido', () =>{
        telaDeLogin()
        cy.get('#join_now').click()
        cy.get('#email-or-phone').type('guigrubba')
        cy.get('#password').type('senha')
        cy.get('#join-form-submit').click()
        cy.get(':nth-child(3) > .artdeco-inline-feedback__message').should('contain.text', 'Please enter a valid email address or mobile number.')
    })

    it('Caso de teste: cadastrando uma senha invalida', () =>{
        telaDeLogin()
        cy.get('#join_now').click()
        cy.get('#email-or-phone').type('guigrubba@gmail.com')
        cy.get('#password').type('senha')
        cy.get('#join-form-submit').click()
        cy.get('.join-form__show-password-container > .inline-alert > .artdeco-inline-feedback__message').should('contain.text', 'Password must be 6 characters or more.')
    })

    it('Caso de teste: passando para a proxima etapa de cadastro', () =>{
        telaDeLogin()
        cy.get('#join_now').click()
        cy.get('#email-or-phone').type('guigrubba@gmail.com')
        cy.get('#password').type('Senha123')
        cy.get('#join-form-submit').click()
        cy.get('.main__subtitle').should('contain.text', 'Make the most of your professional life')
    })

    it('Caso de teste: buscando trabalho no botão jobs', () =>{
        cy.visit('https://www.linkedin.com/')
        cy.get(':nth-child(4) > .top-nav-link').click()
        cy.get('.location-typeahead-input').type('jobs')
        cy.get('#jobs-search-panel > .base-search-bar__form > .base-search-bar__submit-btn').click()
        cy.get('.results-context-header__query-search').should('contain.text', 'Jobs in')
    })

    function telaDeLogin(){
        cy.visit('https://www.linkedin.com/')
        cy.get('.nav__button-secondary').click()
    }
})