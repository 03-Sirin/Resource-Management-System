import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { User } from '../../../core/models/user/user.interface';
import { UsersService } from '../../../core/services/user/user';
import { UserList } from './user-list';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let usersResponse: Subject<User[]>;
  let statusResponse: Subject<User>;

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
    usersResponse = new Subject<User[]>();
    statusResponse = new Subject<User>();

    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: () => usersResponse.asObservable(),
            updateUserStatus: () => statusResponse.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders user details when the users request completes', () => {
    usersResponse.next([user]);
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('tbody');
    expect(table.textContent).toContain('EMP001');
    expect(table.textContent).toContain('Ada');
    expect(table.textContent).toContain('ada@example.com');
  });

  it('renders the updated status when the status request completes', () => {
    usersResponse.next([user]);
    fixture.detectChanges();

    component.toggleStatus(user);
    statusResponse.next({ ...user, status: 'INACTIVE' });
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('tbody');
    expect(table.textContent).toContain('INACTIVE');
    expect(table.textContent).toContain('Enable');
  });
});
