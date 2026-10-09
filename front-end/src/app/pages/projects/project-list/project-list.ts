import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.interface';
import { ProjectsService } from '../../../core/services/projects-service';


@Component({
  selector: 'app-project-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  projects: Project[] = [];
  searchText = '';

  constructor(private projectsService: ProjectsService) {
    this.projects = this.projectsService.getProjects();
  }

  get filteredProjects(): Project[] {
    const search = this.searchText.trim().toLowerCase();

    return this.projects.filter(project =>
      [
        project.name,
        project.companyName,
        project.projectDeveloper,
        project.projectVoice,
        project.description,
        project.manager,
        project.startDate,
        project.endDate ?? '',
        project.status
      ].some(value => value.toLowerCase().includes(search))
    );
  }
}
