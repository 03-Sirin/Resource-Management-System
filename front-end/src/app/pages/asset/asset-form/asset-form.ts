import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AssetsService } from '../../../core/services/asset/asset.interface';
import { Asset } from '../../../core/models/asset.interface';
import { ProjectsService } from '../../../core/services/projects-service';
import { Project } from '../../../core/models/project.interface';

@Component({
  selector: 'app-asset-form',
  imports: [ReactiveFormsModule],
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.css',
})
export class AssetForm {
  private static readonly maxImageSizeBytes = 5 * 1024 * 1024;

  readonly assetForm: FormGroup;

  assetId: number | null = null;
  isEditMode = false;
  isLoadingAsset = false;
  isSaving = false;
  formError = '';
  imageDataUrls: string[] = [];
  imageError = '';
  readonly projects: Project[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assetsService: AssetsService,
    private projectsService: ProjectsService
  ) {
    this.projects = this.projectsService.getProjects();
    this.assetForm = this.formBuilder.group({
      assetTag: ['', Validators.required],
      companyName: ['Internal', Validators.required],
      deviceType: ['', Validators.required],
      receivedDate: ['', Validators.required],
      status: ['Available', Validators.required],
      assignedTo: [''],
      project: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.isEditMode = true;
      this.isLoadingAsset = true;
      const assetId = Number(id);
      if (!Number.isSafeInteger(assetId) || assetId <= 0) {
        this.isLoadingAsset = false;
        this.formError = 'Invalid asset ID.';
        return;
      }

      this.assetId = assetId;
      this.assetsService.getAssetById(assetId).subscribe({
        next: asset => {
          this.assetForm.patchValue(asset);
          this.imageDataUrls = [...(asset.imageUrls ?? [])];
          this.isLoadingAsset = false;
        },
        error: error => {
          console.error('Failed to load asset:', error);
          this.formError = 'Could not load this asset.';
          this.isLoadingAsset = false;
        }
      });
    }
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.imageError = '';

    if (files.length === 0) {
      return;
    }

    const invalidType = files.some(file =>
      !['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)
    );
    if (invalidType) {
      this.imageError = 'Choose PNG, JPEG, WebP, or GIF images only.';
      input.value = '';
      return;
    }

    if (files.some(file => file.size > AssetForm.maxImageSizeBytes)) {
      this.imageError = 'Each image must be 5 MB or smaller.';
      input.value = '';
      return;
    }

    try {
      const selectedImages = await Promise.all(files.map(file => this.readImage(file)));
      this.imageDataUrls = [...this.imageDataUrls, ...selectedImages];
    } catch (error) {
      console.error('Failed to read selected asset images:', error);
      this.imageError = 'Could not read the selected images. Please try again.';
    } finally {
      input.value = '';
    }
  }

  removeImage(index: number): void {
    this.imageDataUrls = this.imageDataUrls.filter((_, imageIndex) => imageIndex !== index);
    this.imageError = '';
  }

  private readImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error(`Could not read image "${file.name}".`));
        }
      };
      reader.onerror = () => reject(reader.error ?? new Error(`Could not read image "${file.name}".`));
      reader.readAsDataURL(file);
    });
  }

  saveAsset(): void {
    if (this.isEditMode && this.assetId === null) {
      return;
    }

    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      this.formError = 'Please complete all required fields before saving.';
      return;
    }

    this.formError = '';
    this.isSaving = true;
    const value = this.assetForm.getRawValue();
    const asset: Omit<Asset, 'id'> = {
      assetTag: value.assetTag!.trim(),
      companyName: value.companyName!,
      deviceType: value.deviceType!,
      receivedDate: value.receivedDate!,
      status: value.status!,
      assignedTo: value.assignedTo?.trim() || undefined,
      project: value.project?.trim() || undefined,
      imageUrls: [...this.imageDataUrls]
    };

    const save = this.isEditMode && this.assetId !== null
      ? this.assetsService.updateAsset(this.assetId, asset)
      : this.assetsService.createAsset(asset);

    save.subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/assets']);
      },
      error: error => {
        console.error('Failed to save asset:', error);
        this.formError = 'Could not save the asset. Please try again.';
        this.isSaving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/assets']);
  }
}
