import { Component,OnInit,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.interface';
import { ProjectsService } from '../../../core/services/projects-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-project-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  projects=signal<Project[]>([]) ;
  searchText = '';

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit():void{
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next:(data) =>{
        console.log('Projects loaded from backend:', data);
        this.projects.set(data);
      },
      error:(error) =>{
        console.error('Error fetching projects:', error);
      }
    });
  }

  get filteredProjects(): Project[] {
    const search = this.searchText.trim().toLowerCase();

    const allProjects = this.projects();
    if(!search) {
      return allProjects;
    }
    return allProjects.filter(project =>
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
      ].some(value =>value? value.toLowerCase().includes(search) : false)
    );
  }
}
