import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Asset, AssetCreateRequest, AssetUpdateRequest } from '../../models/asset.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private readonly apiUrl=environment.assetsUrl;

  constructor(private http: HttpClient) { }
  // GET /api/assets
  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  // GET /api/assets/{id}
  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  createAsset(asset: AssetCreateRequest): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }

  updateAsset(id: number, asset: AssetUpdateRequest): Observable<Asset> {
    return this.http.put<Asset>(`${this.apiUrl}/${id}`, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}