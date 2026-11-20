import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceRequestsService } from '../../../core/services/resource/resource-requests.service';
import { AssetsService } from '../../../core/services/asset/asset.interface';
import { ResourceRequest } from '../../../core/models/resource-request.interface';
import { Asset } from '../../../core/models/asset.interface';

@Component({
  selector: 'app-request-allocate',
  imports: [ReactiveFormsModule],
  templateUrl: './request-allocate.html',
  styleUrl: './request-allocate.css'
})
export class RequestAllocate implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly requestService = inject(ResourceRequestsService);
  private readonly assetsService = inject(AssetsService);

  allocateForm!: FormGroup;
  request = signal<ResourceRequest | null>(null);
  availableAssets = signal<Asset[]>([]);
  isLoading = signal(true);
  isSubmitting = signal(false);
  errorMessage = signal('');
  requestId!: number;

  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));

    this.allocateForm = this.fb.group({
      assetId: ['', Validators.required],
      adminComments: ['']
    });

    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);

    // 1. Fetch Request details
    this.requestService.getRequestById(this.requestId).subscribe({
      next: (req) => {
        this.request.set(req);

        // 2. Fetch available inventory assets matching device type
        this.assetsService.getAssets().subscribe({
          next: (assets) => {
            const matching = assets.filter(
              a => a.status === 'AVAILABLE' && a.deviceType.toLowerCase() === req.deviceType.toLowerCase()
            );
            this.availableAssets.set(matching);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error('Failed to load assets:', err);
            this.isLoading.set(false);
          }
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Failed to load request: ' + (err.error?.message || err.message));
      }
    });
  }

  confirmAllocation(): void {
    if (this.allocateForm.invalid) {
      this.allocateForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const formVal = this.allocateForm.getRawValue();

    this.requestService.allocateAsset(this.requestId, {
      assetId: Number(formVal.assetId),
      adminComments: formVal.adminComments?.trim() || undefined
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/requests']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to allocate asset. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/requests']);
  }
}