export default class BasePO {
  getTable(tableName) {
    return cy.get(`[data-cy-table='${tableName}'`);
  }

  getInput(inputName) {
    return cy.get(`[data-cy-input='${inputName}']`);
  }

  getItem(itemName) {
    return cy.get(`[data-cy-item='${itemName}']`);
  }

  getTextArea(textareaName) {
    return cy.get(`[data-cy-textarea="${textareaName}"]`);
  }

  getButton(buttonName) {
    return cy.get(`[data-cy-button='${buttonName}']`);
  }

  getContainer(containerName) {
    return cy.get(`[data-cy-container='${containerName}']`);
  }

  getLink(linkName) {
    return cy.get(`[data-cy-link='${linkName}']`);
  }

  getElementById(id) {
    return cy.get(`#${id}`);
  }
}
