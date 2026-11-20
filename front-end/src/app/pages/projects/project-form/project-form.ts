import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects-service';
import { Project } from '../../../core/models/project.interface';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {
  projectForm!: FormGroup;
  projectId: number | null = null;
  isEditMode = false;
  isLoading = false;

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
      status: ['ACTIVE', Validators.required],
      manager: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = Number(id);
      this.isEditMode = true;
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: number): void {
    this.isLoading = true;
    this.projectsService.getProjectById(id).subscribe({
      next: (project) => {
        this.isLoading = false;
        if (project) {
          this.projectForm.patchValue(project);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load project details:', err);
      }
    });
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const value = this.projectForm.getRawValue();
    const projectPayload: Omit<Project, 'id'> = {
      name: value.name.trim(),
      companyName: value.companyName.trim(),
      projectDeveloper: value.projectDeveloper.trim(),
      projectVoice: value.projectVoice.trim(),
      description: value.description.trim(),
      startDate: value.startDate,
      endDate: value.endDate ? value.endDate : null,
      status: value.status,
      manager: value.manager.trim()
    };

    if (this.isEditMode && this.projectId !== null) {
      this.projectsService.updateProject(this.projectId, projectPayload).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Failed to update project:', err);
        }
      });
    } else {
      this.projectsService.createProject(projectPayload).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Failed to create project:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}