import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ResourceRequest,
  ResourceRequestCreateRequest,
  ResourceRequestStatusUpdateRequest,
  ResourceRequestAllocateRequest
} from '../../models/resource-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ResourceRequestsService {

  private readonly apiUrl = environment.requestsUrl;

  constructor(private http: HttpClient) {}

  // GET all requests (filtered by user role on backend)
  getRequests(): Observable<ResourceRequest[]> {
    return this.http.get<ResourceRequest[]>(this.apiUrl);
  }

  // GET single request by ID
  getRequestById(id: number): Observable<ResourceRequest> {
    return this.http.get<ResourceRequest>(`${this.apiUrl}/${id}`);
  }

  // POST create new request
  createRequest(request: ResourceRequestCreateRequest): Observable<ResourceRequest> {
    return this.http.post<ResourceRequest>(this.apiUrl, request);
  }

  // PATCH update status (APPROVE, REJECT, CANCEL)
  updateStatus(id: number, request: ResourceRequestStatusUpdateRequest): Observable<ResourceRequest> {
    return this.http.patch<ResourceRequest>(`${this.apiUrl}/${id}/status`, request);
  }

  // PATCH allocate asset from inventory
  allocateAsset(id: number, request: ResourceRequestAllocateRequest): Observable<ResourceRequest> {
    return this.http.patch<ResourceRequest>(`${this.apiUrl}/${id}/allocate`, request);
  }
}