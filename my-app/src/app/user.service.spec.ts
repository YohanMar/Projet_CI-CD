import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of users', () => {
    const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Smith' }];

    service.loadUsers();
    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    const users = service.getUsers();
    expect(users).toEqual(mockUsers);
  });

  it('should return a user by name', () => {
    const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Smith' }];

    service.loadUsers();
    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    const user = service.getUserByName('John Doe');
    expect(user).toEqual({ name: 'John Doe' });
  });

  it('should return undefined if user is not found', () => {
    const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Smith' }];

    service.loadUsers();
    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    const user = service.getUserByName('Unknown User');
    expect(user).toBeUndefined();
  });
});
