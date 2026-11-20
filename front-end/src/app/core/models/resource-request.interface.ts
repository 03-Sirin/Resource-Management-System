export type RequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALLOCATED' | 'CANCELLED';

export interface ResourceRequest {
  id: number;
  requestNumber: string;
  requesterId: number;
  requesterName: string;
  requesterEmail: string;
  projectId: number;
  projectName: string;
  deviceType: string;
  specifications?: string;
  priority: RequestPriority;
  requiredDate: string; // 'YYYY-MM-DD'
  status: RequestStatus;
  reason: string;
  allocatedAssetId?: number;
  allocatedAssetTag?: string;
  allocatedDeviceType?: string;
  adminComments?: string;
  createdAt?: string;
}

export interface ResourceRequestCreateRequest {
  projectId: number;
  deviceType: string;
  specifications?: string;
  priority: RequestPriority;
  requiredDate: string;
  reason: string;
}

export interface ResourceRequestStatusUpdateRequest {
  status: RequestStatus;
  adminComments?: string;
}

export interface ResourceRequestAllocateRequest {
  assetId: number;
  adminComments?: string;
}