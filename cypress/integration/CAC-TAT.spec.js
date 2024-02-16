// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

  const textAreaText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius fermentum mi, et ornare mauris porttitor id. Suspendisse faucibus purus quis purus feugiat vestibulum. Praesent porta, tellus eu varius vehicula, nunc leo vulputate magna, eget lacinia nibh ipsum vitae justo. Praesent sed hendrerit libero. In efficitur eu sem sed tempus.'

  beforeEach(function () {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('matheuslopesheleno@gmail.com')
    cy.get('#open-text-area').type(textAreaText, { delay: 0 })
    //cy.get('.button').click()
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('matheus.email.com')
    cy.get('#open-text-area').type(textAreaText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('validação telefone só aceita números', function () {
    cy.get('#phone').type('abcdefghij').should('be.empty')
    cy.get('#phone').type('abcdefghij').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('matheuslopesheleno@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(textAreaText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName').type('Matheus').should('have.value', 'Matheus')
    cy.get('#lastName').type('Lopes').should('have.value', 'Lopes')
    cy.get('#email').type('matheuslopesheleno@gmail.com').should('have.value', 'matheuslopesheleno@gmail.com')
    cy.get('#phone').type('21995034244').should('have.value', '21995034244')
    cy.get('#open-text-area').type(textAreaText, { delay: 0 }).should('have.value', textAreaText)

    cy.get('#firstName').clear().should('have.value', '')//be.empty
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
    cy.get('#open-text-area').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit('Matheus', 'Lopes', 'matheuslopesheleno@gmail.com', textAreaText)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    //cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  /*it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('#email-checkbox').check().should('be.checked')
    cy.get('#phone-checkbox').check().should('be.checked').uncheck()
  })*/

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[id="file-upload"]').selectFile('cypress/fixtures/example.json').should(function (input) {
      expect(input[0].files[0].name).be.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[id="file-upload"]').selectFile('cypress/fixtures/example.json', {action: "drag-drop"}).should(function (input) {
      expect(input[0].files[0].name).be.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture("example").as('testFile')
    cy.get('input[id="file-upload"]').selectFile('@testFile').should(function (input) {
      expect(input[0].files[0].name).be.equal('example')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('a').invoke('removeAttr', 'target').click()
  })
})

//O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.