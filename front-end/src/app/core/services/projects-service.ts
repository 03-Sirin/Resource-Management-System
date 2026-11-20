import { Injectable } from '@angular/core';
import { Project } from '../models/project.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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

  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, updates: Omit<Project, 'id'>): Observable<Project> {
    return this.http.put<Project >(`${this.apiUrl}/${id}`, updates);
  }
  }


