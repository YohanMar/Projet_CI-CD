import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['loadUsers', 'getUserByName']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display alert if username is not entered', () => {
    spyOn(window, 'alert');
    component.loginForm.controls['login'].setValue('');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Veuillez saisir un nom d\'utilisateur');
  });

  it('should display alert if user is not found', () => {
    spyOn(window, 'alert');
    const userName = 'unknown';
    userServiceSpy.getUserByName.and.returnValue(undefined);
    authServiceSpy.login.and.returnValue(of(false));

    component.loginForm.controls['login'].setValue(userName);
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Utilisateur non trouvé');
  });
});
