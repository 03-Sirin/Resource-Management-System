import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { ProjectsService } from '../../../core/services/projects-service';
import { Project, ProjectStatus } from '../../../core/models/project.interface';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {
  readonly projectForm: FormGroup;
  project: Project | null = null;
  projectId: number | null = null;
  isEditMode = false;
  isLoading = false;
  isSaving = false;
  formError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      companyName: ['', Validators.required],
      projectDeveloper: [''],
      projectVoice: [''],
      manager: [''],
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      status: ['ACTIVE', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.isEditMode = true;
      const projectId = Number(id);
      if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        this.formError = 'Invalid project ID.';
        return;
      }

      this.projectId = projectId;
      this.isLoading = true;
      this.projectsService.getProjectById(projectId).subscribe({
        next: project => {
          this.project = project;
          this.projectForm.patchValue(project);
          this.isLoading = false;
        },
        error: error => {
          console.error('Failed to load project:', error);
          this.formError = 'Could not load this project.';
          this.isLoading = false;
        }
      });
    }
  }

  get needsEndDate(): boolean {
    return this.projectForm.controls['status'].value === 'COMPLETED'
      && !this.projectForm.controls['endDate'].value;
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      if (this.projectForm.controls['status'].value === 'COMPLETED'
        && !this.projectForm.controls['endDate'].value) {
        this.formError = 'An end date is required for a completed project.';
      }
      return;
    }

    if (this.projectForm.controls['status'].value === 'COMPLETED'
      && !this.projectForm.controls['endDate'].value) {
      this.projectForm.controls['endDate'].markAsTouched();
      this.formError = 'An end date is required for a completed project.';
      return;
    }

    const value = this.projectForm.getRawValue();
    const status = value.status as ProjectStatus;
    const request = {
      companyName: value.companyName.trim(),
      projectDeveloper: value.projectDeveloper.trim() || null,
      projectVoice: value.projectVoice.trim() || null,
      manager: value.manager.trim() || null,
      name: value.name.trim(),
      description: value.description.trim() || null,
      startDate: value.startDate,
      endDate: value.endDate || this.project?.endDate || null
    };

    this.formError = '';
    this.isSaving = true;

    const save$ = this.isEditMode && this.projectId !== null
      ? this.projectsService.updateProject(this.projectId, request).pipe(
          switchMap(project => project.status === status
            ? of(project)
            : this.projectsService.updateProjectStatus(
                project.id,
                status,
                value.endDate || undefined
              ))
        )
      : this.projectsService.createProject({
          companyName: request.companyName,
          projectDeveloper: request.projectDeveloper,
          projectVoice: request.projectVoice,
          manager: request.manager,
          name: request.name,
          description: request.description,
          startDate: request.startDate
        }).pipe(
          switchMap(project => status === 'ACTIVE'
            ? of(project)
            : this.projectsService.updateProjectStatus(
                project.id,
                status,
                value.endDate || undefined
              ))
        );

    save$.subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/projects']);
      },
      error: error => {
        console.error('Failed to save project:', error);
        this.formError = 'Could not save the project. Please check the values and try again.';
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}
