import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceRequestsService } from '../../../core/services/resource/resource-requests.service';
import { ProjectsService } from '../../../core/services/projects-service';
import { Project } from '../../../core/models/project.interface';
import { RequestPriority } from '../../../core/models/resource-request.interface';

@Component({
  selector: 'app-request-form',
  imports: [ReactiveFormsModule],
  templateUrl: './request-form.html',
  styleUrl: './request-form.css'
})
export class RequestForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly requestService = inject(ResourceRequestsService);
  private readonly projectsService = inject(ProjectsService);

  requestForm!: FormGroup;
  projects = signal<Project[]>([]);
  isSaving = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      projectId: ['', Validators.required],
      deviceType: ['Laptop', Validators.required],
      priority: ['MEDIUM', Validators.required],
      requiredDate: ['', Validators.required],
      specifications: [''],
      reason: ['', Validators.required]
    });

    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Failed to load projects for request form:', err)
    });
  }

  saveRequest(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    const formVal = this.requestForm.getRawValue();

    this.requestService.createRequest({
      projectId: Number(formVal.projectId),
      deviceType: formVal.deviceType,
      priority: formVal.priority as RequestPriority,
      requiredDate: formVal.requiredDate,
      specifications: formVal.specifications?.trim() || undefined,
      reason: formVal.reason.trim()
    }).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/requests']);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to submit request. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/requests']);
  }
}