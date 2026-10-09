export interface Asset {
  id: number;
  assetTag: string;
  companyName: 'Internal' | 'Client';
  deviceType: string;
  receivedDate: string;
  status: string;
  assignedTo?: string;
  project?: string;
  imageUrls?: string[];
}