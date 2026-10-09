import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Asset } from '../../models/asset.interface';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private readonly assets: Asset[] = [
    {
      id: 1,
      assetTag: 'AST-001',
      companyName: 'Internal',
      deviceType: 'Laptop',
      receivedDate: '2026-01-15',
      status: 'Available'
    },
    {
      id: 2,
      assetTag: 'AST-002',
      companyName: 'Client',
      deviceType: 'Monitor',
      receivedDate: '2026-02-03',
      status: 'Assigned',
      assignedTo: 'John Smith',
      project: 'Project Alpha'
    },
    {
      id: 3,
      assetTag: 'AST-003',
      companyName: 'Internal',
      deviceType: 'Mobile Phone',
      receivedDate: '2026-02-18',
      status: 'Available'
    },
    {
      id: 4,
      assetTag: 'AST-004',
      companyName: 'Client',
      deviceType: 'Laptop',
      receivedDate: '2026-03-07',
      status: 'Assigned',
      assignedTo: 'Priya Sharma',
      project: 'Project Beta'
    },
    {
      id: 5,
      assetTag: 'AST-005',
      companyName: 'Internal',
      deviceType: 'Tablet',
      receivedDate: '2026-03-21',
      status: 'Maintenance'
    }
  ];

  // GET /api/assets
  getAssets(): Observable<Asset[]> {
    return of(this.assets.map(asset => ({ ...asset })));
  }

  // GET /api/assets/{id}
  getAssetById(id: number): Observable<Asset> {
    const asset = this.assets.find(item => item.id === id);

    return asset
      ? of({ ...asset })
      : throwError(() => new Error(`Asset ${id} was not found.`));
  }

  createAsset(asset: Omit<Asset, 'id'>): Observable<Asset> {
    const createdAsset: Asset = {
      ...asset,
      id: Math.max(0, ...this.assets.map(item => item.id)) + 1
    };

    this.assets.push(createdAsset);
    return of({ ...createdAsset });
  }

  updateAsset(id: number, updates: Omit<Asset, 'id'>): Observable<Asset> {
    const index = this.assets.findIndex(item => item.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Asset ${id} was not found.`));
    }

    const updatedAsset: Asset = { ...updates, id };
    this.assets[index] = updatedAsset;
    return of({ ...updatedAsset });
  }
}