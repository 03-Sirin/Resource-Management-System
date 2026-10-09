import { Component } from '@angular/core';
import { ReactiveFormsModule,Validators,FormBuilder,FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects-service';
import { Project } from '../../../core/models/project.interface';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {

    projectForm!: FormGroup;

    project: Project | undefined;
    projectId: number | null = null;
    isEditMode = false;
    
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      projectDeveloper: ['', Validators.required],
      projectVoice: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      status: ['Active', Validators.required],
      manager: ['', Validators.required]
    });
    const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.projectId = Number(id);
    this.isEditMode = true;

    this.project = this.projectsService.getProjectById(this.projectId);

    if (this.project) {
      this.projectForm.patchValue(this.project);
    }
  }
  }

  

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const value = this.projectForm.getRawValue();
    const project: Omit<Project, 'id'> = {
      name: value.name.trim(),
      companyName: value.companyName.trim(),
      projectDeveloper: value.projectDeveloper.trim(),
      projectVoice: value.projectVoice.trim(),
      description: value.description.trim(),
      startDate: value.startDate,
      endDate: value.endDate || null,
      status: value.status,
      manager: value.manager.trim()
    };

    if (this.isEditMode && this.projectId !== null) {
      this.projectsService.updateProject(this.projectId, project);
    } else {
      this.projectsService.createProject(project);
    }

    this.router.navigate(['/projects']);
  }

  cancel() {
    this.router.navigate(['/projects']);
  }
}
