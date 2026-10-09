import { Injectable } from '@angular/core';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
    projects: Project[] = [
    {
      id: 1,
      name: 'Project Alpha',
      companyName: 'Zoho',
      projectDeveloper: 'Priya Sharma',
      projectVoice: 'Sirin',
      description: 'Resource management application',
      startDate: '2026-01-10',
      endDate: '2026-12-31',
      status: 'Active',
      manager: 'Priya Sharma'
    },
    {
      id: 2,
      name: 'Project Beta',
      companyName: 'CTS',
      projectDeveloper: 'Rahul Raj',
      projectVoice: 'Mahathi',
      description: 'Inventory tracking system',
      startDate: '2026-02-15',
      endDate: '2026-11-30',
      status: 'Active',
      manager: 'Rahul Raj'
    },
    {
      id: 3,
      name: 'Project Gamma',
      companyName: 'TCS',
      projectDeveloper: 'Arun Kumar',
      projectVoice: 'Afrin',
      description: 'Employee management system',
      startDate: '2025-06-01',
      endDate: '2026-05-31',
      status: 'Completed',
      manager: 'Arun Kumar'
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  createProject(project: Omit<Project, 'id'>): Project {
    const createdProject: Project = {
      ...project,
      id: Math.max(0, ...this.projects.map(item => item.id)) + 1
    };

    this.projects.push(createdProject);
    return createdProject;
  }

  updateProject(id: number, updates: Omit<Project, 'id'>): Project | undefined {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) {
      return undefined;
    }

    const updatedProject: Project = { ...updates, id };
    this.projects[index] = updatedProject;
    return updatedProject;
  }
}
