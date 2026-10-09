export interface Project {
  id: number;
  companyName: string;
  projectDeveloper: string | null;
  projectVoice: string | null;
  manager: string | null;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  status: ProjectStatus;
}

export type ProjectStatus = 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';