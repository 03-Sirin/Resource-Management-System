import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Asset } from '../../../core/models/asset.interface';
import { AssetsService } from '../../../core/services/asset/asset.interface';

@Component({
  selector: 'app-asset-details',
  imports: [RouterLink],
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.css'
})
export class AssetDetails implements OnInit {
  asset = signal<Asset | null>(null);
  loading = signal(true);
  loadError = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetsService: AssetsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.loading.set(false);
      this.loadError.set('Asset not found.');
      return;
    }

    this.assetsService.getAssetById(id).subscribe({
      next: asset => {
        this.asset.set(asset);
        this.loading.set(false);
      },
      error: error => {
        console.error('Failed to load asset:', error);
        this.loading.set(false);
        this.loadError.set('Could not load this asset. It may not exist.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/assets']);
  }
}
