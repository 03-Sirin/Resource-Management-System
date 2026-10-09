export interface Project {
  id: number;
  name: string;
  companyName: string;
  projectDeveloper: string;
  projectVoice:string;
  description: string;
  startDate: string;
  endDate: string | null;
  status: string;
  manager: string;
}