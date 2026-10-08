import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../../../core/models/user/user.interface';
import { UsersService } from '../../../core/services/user/user';
import { UserDetails } from './user-details';

describe('UserDetails', () => {
  let component: UserDetails;
  let fixture: ComponentFixture<UserDetails>;
  let userResponse: Subject<User>;

  const user: User = {
    id: 1,
    employeeCode: 'EMP001',
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    phone: '1234567890',
    role: 'EMPLOYEE',
    status: 'ACTIVE',
  };

  beforeEach(async () => {
    userResponse = new Subject<User>();

    await TestBed.configureTestingModule({
      imports: [UserDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
        {
          provide: UsersService,
          useValue: { getUserById: () => userResponse.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows user details when the lookup succeeds', () => {
    userResponse.next(user);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('ada@example.com');
    expect(fixture.nativeElement.textContent).not.toContain('User not found.');
  });

  it('shows a loading message while the lookup is pending', () => {
    expect(fixture.nativeElement.textContent).toContain('Loading user details...');
  });
});
