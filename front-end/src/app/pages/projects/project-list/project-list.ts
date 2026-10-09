import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.interface';
import { ProjectsService } from '../../../core/services/projects-service';


@Component({
  selector: 'app-project-list',
  imports: [RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {
    this.projects = this.projectsService.getProjects();
  }
}
