'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Encryption = use('Encryption');
const Token = use('App/Models/Token');
const Error401Exception = use('App/Exceptions/Error401Exception');
const Error403Exception = use('App/Exceptions/Error403Exception');

class RefreshTokenCheckExpireTime {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, antl }, next) {
    const { refreshToken } = request.all();

    const tokenForDelete = await Token.findBy('token', Encryption.decrypt(refreshToken));

    if (!tokenForDelete) {
      throw new Error401Exception(antl.formatMessage('exception.refresh_token_not_found'));
    }

    if (Date.now() - new Date(tokenForDelete.created_at) > 100 * 1000) {
      throw new Error403Exception(antl.formatMessage('exception.refresh_token_outdated'));
    }

    await next()
  }
}

module.exports = RefreshTokenCheckExpireTime;
