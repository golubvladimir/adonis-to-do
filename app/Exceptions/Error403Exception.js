'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class Error403Exception extends LogicalException {
  /**
   * Handle this exception by itself
   */

  handle (error, { response }) {
    console.log(error);

    response.status(401).send(error.message)
  }
}

module.exports = Error403Exception
