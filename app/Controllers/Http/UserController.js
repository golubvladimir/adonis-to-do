'use strict'

const User = use('App/Models/User');
const Encryption = use('Encryption');
const Token = use('App/Models/Token');

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth
      .withRefreshToken()
      .attempt(email, password);

    return token;
  }

  async registration({ request }) {
    const { email, password } = request.all();

    const user = User.create({
      username: email,
      email,
      password
    });

    return user;
  }

  async refreshToken({ request, auth }) {
    const { refreshToken } = request.all();

    const token = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken);

    await Token
      .query()
      .where('token', Encryption.encrypt(refreshToken))
      .delete();

    return token;
  }

  async logOut({ auth }) {
    const { id } = await auth.getUser();

    await Token
      .query()
      .where('user_id', id)
      .delete();

    return {
      result: true
    }
  }
}

module.exports = UserController;
