'use strict'

const Project = use('App/Models/Project');

class ProjectController {
  async getProjects() {
    const projects = await Project.query().with('tasks').fetch();

    return projects;
  }

  async addProject({ request, auth }) {
    const { title, description} = request.all();

    const user = await auth.getUser();

    const project = new Project();

    project.fill({
      title,
      description
    });

    user.projects().save(project);

    return project;
  }

  async deleteProject({ request, auth, params }) {
    const { id } = params;

    const project = await Project.find(id);

    await project.delete();

    return project;
  }

  async updateProject({ request, auth, params }) {
    const { title, description } = request.all();
    const { id } = params;

    const user = await auth.getUser();

    const project = await Project.find(id);

    project.merge({
      title,
      description
    });

    await project.save();

    return project;
  }
}

module.exports = ProjectController;
