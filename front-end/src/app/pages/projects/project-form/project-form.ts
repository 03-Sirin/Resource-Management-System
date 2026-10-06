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
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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

  

  saveProject() {

  if (this.projectForm.invalid) {
    this.projectForm.markAllAsTouched();
    return;
  }

  if (this.isEditMode) {

    console.log('Updating project:', this.projectId);
    console.log(this.projectForm.value);

  } else {

    console.log('Creating project:');
    console.log(this.projectForm.value);

  }

  this.router.navigate(['/projects']);
}

  cancel() {
    this.router.navigate(['/projects']);
  }
}
