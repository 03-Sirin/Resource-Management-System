import { Component } from '@angular/core';
import { RouterLink,ActivatedRoute,Router } from '@angular/router';
import { Project } from '../../../core/models/project.interface';
import { ProjectsService } from '../../../core/services/projects-service';

@Component({
  selector: 'app-project-details',
  imports: [RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
    project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.project = this.projectsService.getProjectById(id);
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
