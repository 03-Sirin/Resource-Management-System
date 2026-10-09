import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProjectDetails } from './project-details';
import { ProjectsService } from '../../../core/services/projects-service';
import { Project } from '../../../core/models/project.interface';

describe('ProjectDetails', () => {
  let component: ProjectDetails;
  let fixture: ComponentFixture<ProjectDetails>;
  const project: Project = {
    id: 1,
    name: 'Sirin Vifakga',
    companyName: 'Amazon',
    projectDeveloper: 'Ada Developer',
    projectVoice: 'Ava',
    manager: 'Grace Hopper',
    description: 'AWS creation',
    startDate: '2026-10-12',
    endDate: null,
    status: 'ON_HOLD'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetails],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ProjectsService, useValue: { getProjectById: () => of(project) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders project details returned by the API', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Sirin Vifakga');
    expect(fixture.nativeElement.textContent).toContain('Amazon');
    expect(fixture.nativeElement.textContent).toContain('Ada Developer');
    expect(fixture.nativeElement.textContent).toContain('Ava');
    expect(fixture.nativeElement.textContent).toContain('Grace Hopper');
    expect(fixture.nativeElement.textContent).toContain('On Hold');
    expect(component.isLoading()).toBe(false);
  });
});
