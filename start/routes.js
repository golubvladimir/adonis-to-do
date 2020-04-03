'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const apiGroup = (group) => {
  group.prefix('api');
  return group;
};

apiGroup(
  Route
    .group(() => {
      Route.post('login', 'UserController.login')
        .validator('Login');
      Route.post('registration', 'UserController.registration')
        .validator('Registration');
      Route
        .post('token', 'UserController.refreshToken')
        .validator('RefreshToken')
        .middleware('refreshTokenCheckExpireTime');
      Route
        .get('logout', 'UserController.logOut')
        .middleware('auth');
    })
    .prefix('auth')
);

apiGroup(
  Route
    .group(() => {
      Route
        .post('/', 'ProjectController.addProject')
        .validator('Project');
      Route.get('/', 'ProjectController.getProjects');
      Route.delete('/:id', 'ProjectController.deleteProject');
      Route
        .put('/:id', 'ProjectController.updateProject')
        .validator('Project');
    })
    .middleware('auth')
    .prefix('projects')
);

apiGroup(
  Route
    .group(() => {
      Route.get('/:id', 'TaskController.getTasks');
      Route
        .post('/:id', 'TaskController.addTask')
        .validator('Task');
      Route.delete('/:id', 'TaskController.deleteTask');
      Route
        .put('/:id', 'TaskController.updateTask')
        .validator('Task');
      Route.patch('/:id', 'TaskController.changeStatus');
    })
    .middleware('auth')
    .prefix('tasks')
);
