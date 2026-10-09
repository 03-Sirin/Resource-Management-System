import { Component, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectStatus } from '../../../core/models/project.interface';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-project-details',
  imports: [RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  project = signal<Project | null>(null);
  isLoading = signal(true);
  loadError = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id <= 0) {
      this.loadError.set('Invalid project ID.');
      this.isLoading.set(false);
      return;
    }

    this.projectsService.getProjectById(id).subscribe({
      next: project => {
        this.project.set(project);
        this.isLoading.set(false);
      },
      error: error => {
        console.error('Failed to load project details:', error);
        this.loadError.set('Could not load this project.');
        this.isLoading.set(false);
      }
    });
  }

  statusLabel(status: ProjectStatus): string {
    return status
      .toLowerCase()
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
