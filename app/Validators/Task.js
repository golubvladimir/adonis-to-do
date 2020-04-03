'use strict'

class Task {
  get rules () {
    return {
      title: 'required',
    }
  }

  async fails (errorMessages) {
    errorMessages.map(item => {
      switch (item.validation) {
        case 'required':
          item.message = this.ctx.antl.formatMessage('validation.required_field');
          break;
      }
    });

    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Task
