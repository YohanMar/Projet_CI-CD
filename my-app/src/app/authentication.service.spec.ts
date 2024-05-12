import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isAdminEntered to true and return true when admin is logged in', () => {
    const username = 'admin';
    const mockUsers = [{ name: 'admin' }];

    service.login(username).subscribe((result) => {
      expect(result).toBeTrue();
      expect(service.isAdminEntered).toBeTrue();
    });

    const req = httpMock.expectOne('data/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should return true when a non-admin user is logged in', () => {
    const username = 'John Doe';
    const mockUsers = [{ name: 'John Doe' }];

    service.login(username).subscribe((result) => {
      expect(result).toBeTrue();
      expect(service.isAdminEntered).toBeFalse();
    });

    const req = httpMock.expectOne('data/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should return false when an invalid user is logged in', () => {
    const username = 'unknown';
    const mockUsers = [{ name: 'John Doe' }];

    service.login(username).subscribe((result) => {
      expect(result).toBeFalse();
      expect(service.isAdminEntered).toBeFalse();
    });

    const req = httpMock.expectOne('data/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
