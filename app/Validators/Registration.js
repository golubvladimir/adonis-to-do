'use strict'

const Antl = use('Antl');

class Registration {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      password: 'required|min:8'
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
        case 'min':
          item.message = this.ctx.antl.formatMessage('validation.password_length');
          break;
        case 'unique':
          item.message = this.ctx.antl.formatMessage('validation.email_registered');
      }
    });

    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Registration;
