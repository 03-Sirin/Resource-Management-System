export type AssetStatus = 'AVAILABLE' | 'ASSIGNED' | 'UNDER_MAINTENANCE' | 'RETIRED';

export interface Asset {
  id: number;
  assetTag: string;
  companyName: string;
  deviceType: string;
  receivedDate: string; // 'YYYY-MM-DD'
  status: AssetStatus;
  assignedTo?: string;
  project?: string;
  imageUrls?: string[];
}

export type AssetCreateRequest = Omit<Asset, 'id'>;
export type AssetUpdateRequest = Omit<Asset, 'id'>;