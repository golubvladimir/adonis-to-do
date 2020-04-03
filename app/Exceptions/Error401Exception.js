'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class Error401Exception extends LogicalException {
  /**
   * Handle this exception by itself
   */

  handle (error, { response }) {
    response.status(401).send(error.message);
  }
}

module.exports = Error401Exception
