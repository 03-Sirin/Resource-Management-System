import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project, ProjectStatus } from '../models/project.interface';
import { environment } from '../../../environments/environment';

export type ProjectCreateRequest = Pick<
  Project,
  'companyName' | 'projectDeveloper' | 'projectVoice' | 'manager' | 'name' | 'description' | 'startDate'
>;

export type ProjectUpdateRequest = ProjectCreateRequest & Pick<Project, 'endDate'>;

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apiUrl = environment.projectsUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(request: ProjectCreateRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, request);
  }

  updateProject(id: number, request: ProjectUpdateRequest): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, request);
  }

  updateProjectStatus(
    id: number,
    status: ProjectStatus,
    endDate?: string
  ): Observable<Project> {
    const params: Record<string, string> = { status };
    if (endDate) {
      params['endDate'] = endDate;
    }

    return this.http.patch<Project>(`${this.apiUrl}/${id}/status`, null, { params });
  }
}
