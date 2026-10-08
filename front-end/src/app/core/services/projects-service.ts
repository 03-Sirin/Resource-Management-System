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
      projectCode: 'PA-101',
      projectDeveloper: 'Priya Sharma',
      projectVoice: 'Resource management application',
      description: 'Resource management application',
      startDate: '2026-01-10',
      endDate: '2026-12-31',
      status: 'Active',
      manager: 'Priya Sharma'
    },
    {
      id: 2,
      name: 'Project Beta',
      projectCode: 'PB-202',
      projectDeveloper: 'Rahul Raj',
      projectVoice: 'Inventory tracking system',
      description: 'Inventory tracking system',
      startDate: '2026-02-15',
      endDate: '2026-11-30',
      status: 'Active',
      manager: 'Rahul Raj'
    },
    {
      id: 3,
      name: 'Project Gamma',
      projectCode: 'PG-303',
      projectDeveloper: 'Arun Kumar',
      projectVoice: 'Employee management system',
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
}
