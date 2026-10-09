import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
export class ProjectList implements OnInit {
  projects = signal<Project[]>([]);
  searchText = '';
  isLoading = signal(true);
  loadError = signal('');

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.loadError.set('');
    this.projectsService.getProjects().subscribe({
      next: projects => {
        this.projects.set(projects);
        this.isLoading.set(false);
      },
      error: error => {
        console.error('Failed to load projects:', error);
        this.loadError.set(this.getLoadErrorMessage(error));
        this.isLoading.set(false);
      }
    });
  }

  private getLoadErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 0) {
      return 'Cannot reach the projects API. Check that the backend is running and that this page is opened from http://localhost:4200.';
    }

    if (error instanceof HttpErrorResponse) {
      return `Could not load projects (HTTP ${error.status}). Please try again.`;
    }

    return 'Could not load projects. Please try again.';
  }

  get filteredProjects(): Project[] {
    const search = this.searchText.trim().toLowerCase();

    return this.projects().filter(project =>
      [
        project.companyName,
        project.projectDeveloper ?? '',
        project.projectVoice ?? '',
        project.manager ?? '',
        project.name,
        project.description ?? '',
        project.startDate,
        project.endDate ?? '',
        project.status
      ].some(value => value.toLowerCase().includes(search))
    );
  }

  statusLabel(status: Project['status']): string {
    return status
      .toLowerCase()
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
