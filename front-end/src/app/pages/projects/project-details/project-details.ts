import { Component,OnInit, signal } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import { Project } from '../../../core/models/project.interface';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-project-details',
  imports: [RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails implements OnInit {
    project= signal<Project |null>(null);
    isLoading=signal(true);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {
  }

    ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.projectsService.getProjectById(id).subscribe({
        next: (data) => {
          this.project.set(data);
          this.isLoading.set(false);

        },
        error: (err) => {
          console.error('Failed to load project details:', err);
          this.isLoading.set(false);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
