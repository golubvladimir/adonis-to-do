'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');


class TaskController {
  async addTask({ request, params }) {
    const { title } = request.all();
    const { id } = params;

    const project = await Project.find(id);

    const task = new Task();

    task.fill({
      title
    });

    project.tasks().save(task);

    return task;
  }

  async deleteTask({ params }) {
    const { id } = params;

    const task = await Task.find(id);

    await task.delete();

    return task;
  }

  async updateTask({ request, params }) {
    const { title } = request.all();
    const { id } = params;

    const task = await Task.find(id);

    task.merge({
      title
    });

    await task.save();

    return task;
  }

  async getTasks({ params }) {
    const { id } = params;

    const project = await Project.find(id);

    const tasks = project.tasks().fetch();

    return tasks;
  }

  async changeStatus({ params }) {
    const { id } = params;

    const task = await Task.find(id);

    task.merge({
      status: Number(!task.status)
    });

    await task.save();

    return task;
  }
}

module.exports = TaskController;
