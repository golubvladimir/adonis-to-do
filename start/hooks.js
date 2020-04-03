const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Exception = use('Exception');

  Exception.handle('ExpiredJwtToken', async (error, { response, antl }) => {
    response.status(401).send(antl.formatMessage('exception.token_outdated'));
  });
});
