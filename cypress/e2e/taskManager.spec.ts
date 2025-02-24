describe('Simple Task Manager', () => {
  beforeEach(() => {
    // Visit the mainpage before each test
    cy.visit('/')
  })

  it('should allow a user to add a new task', () => {
    // Fill out the form
    cy.get('input[placeholder="Title"]').type('Test Task')
    cy.get('textarea[placeholder="Description"]').type('This is a test task description')
    cy.get('input[type="date"]').type('2025-12-25')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that the new task appears in the table
    cy.contains('Test Task')
    cy.contains('This is a test task description')
    cy.contains('2025-12-25')
    cy.contains('Pending')
  })

  it('should allow a user to toggle the task completion', () => {
    // Add a new task first
    cy.get('input[placeholder="Title"]').type('Test Task Toggle')
    cy.get('textarea[placeholder="Description"]').type('Description for toggle task')
    cy.get('input[type="date"]').type('2025-12-25')
    cy.get('button[type="submit"]').click()

    // Toggle completion status
    cy.contains('Test Task Toggle').parent().find('button').contains('Toggle Status').click()

    // Assert that the task status is now "Completed"
    cy.contains('Completed')
  })

  it('should allow a user to delete a task', () => {
    // Add a task to delete
    cy.get('input[placeholder="Title"]').type('Test Task Delete')
    cy.get('textarea[placeholder="Description"]').type('Description for delete task')
    cy.get('input[type="date"]').type('2025-12-25')
    cy.get('button[type="submit"]').click()

    // Delete the task
    cy.contains('Test Task Delete').parent().find('button').contains('Delete').click()

    // Assert that the task no longer appears in the table
    cy.contains('Test Task Delete').should('not.exist')
  })

  it('should show red borders when fields are empty and the form is submitted', () => {
    // Focus and blur the fields to trigger the validation
    cy.get('input[placeholder="Title"]').focus()
    cy.get('input[placeholder="Title"]').blur()
    cy.get('textarea[placeholder="Description"]').focus()
    cy.get('textarea[placeholder="Description"]').blur()
    cy.get('input[type="date"]').focus()
    cy.get('input[type="date"]').blur()

    // Trigger form submission without filling out any fields
    cy.get('form').submit()

    // Assert that red borders appear for the input fields
    cy.get('input[placeholder="Title"]').should('have.class', 'border-red-500')
    cy.get('textarea[placeholder="Description"]').should('have.class', 'border-red-500')
    cy.get('input[type="date"]').should('have.class', 'border-red-500')
  })
})
