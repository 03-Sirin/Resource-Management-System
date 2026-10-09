import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { Project } from '../models/project.interface';
import { environment } from '../../../environments/environment';
import { ProjectsService } from './projects-service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProjectsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('loads projects from the projects API', () => {
    const projects: Project[] = [{
      id: 12,
      companyName: 'Example Company',
      projectDeveloper: 'Ada Developer',
      projectVoice: 'Ava',
      manager: 'Grace Hopper',
      name: 'Resource Portal',
      description: null,
      startDate: '2026-06-01',
      endDate: null,
      status: 'ACTIVE'
    }];

    service.getProjects().subscribe(result => expect(result).toEqual(projects));

    const request = httpTestingController.expectOne(environment.projectsUrl);
    expect(request.request.method).toBe('GET');
    request.flush(projects);
  });

  it('creates a project with the backend request shape', () => {
    const createRequest = {
      companyName: 'Example Company',
      projectDeveloper: 'Ada Developer',
      projectVoice: 'Ava',
      manager: 'Grace Hopper',
      name: 'New Project',
      description: 'Project description',
      startDate: '2026-06-15'
    };

    service.createProject(createRequest).subscribe();

    const request = httpTestingController.expectOne(environment.projectsUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(createRequest);
    request.flush({ ...createRequest, id: 13, endDate: null, status: 'ACTIVE' });
  });

  it('sends status changes as query parameters', () => {
    service.updateProjectStatus(12, 'COMPLETED', '2026-12-31').subscribe();

    const request = httpTestingController.expectOne(
      `${environment.projectsUrl}/12/status?status=COMPLETED&endDate=2026-12-31`
    );
    expect(request.request.method).toBe('PATCH');
    request.flush({
      id: 12,
      companyName: 'Example Company',
      projectDeveloper: 'Ada Developer',
      projectVoice: 'Ava',
      manager: 'Grace Hopper',
      name: 'Resource Portal',
      description: null,
      startDate: '2026-06-01',
      endDate: '2026-12-31',
      status: 'COMPLETED'
    });
  });
});
