'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  async fails (errorMessages) {
    errorMessages.map(item => {
      switch (item.validation) {
        case 'required':
          item.message = this.ctx.antl.formatMessage('validation.required_field');
          break;
        case 'email':
          item.message = this.ctx.antl.formatMessage('validation.email_format');
          break;
      }
    });

    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Login
