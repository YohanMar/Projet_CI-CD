import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminConfigComponent } from './admin-config.component';
import { GroupService } from '../group.service';
import { of } from 'rxjs';

describe('AdminConfigComponent', () => {
  let component: AdminConfigComponent;
  let fixture: ComponentFixture<AdminConfigComponent>;
  let groupService: GroupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfigComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: GroupService, useValue: { createGroups: jasmine.createSpy('createGroups').and.returnValue(of(null)), getGroups: jasmine.createSpy('getGroups').and.returnValue([]) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfigComponent);
    component = fixture.componentInstance;
    groupService = TestBed.inject(GroupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Le formulaire doit fonctionner avec les 3 éléments', () => {
    expect(component.configForm.contains('userCount')).toBeTruthy();
    expect(component.configForm.contains('groupCount')).toBeTruthy();
    expect(component.configForm.contains('lastGroupConfig')).toBeTruthy();
  });

  it('Le formulaire doit être invalide si userCount est null', () => {
    component.configForm.controls['userCount'].setValue(null);
    component.configForm.controls['groupCount'].setValue(1);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    expect(component.configForm.valid).toBeFalsy();
  });

  it('Le formulaire doit être invalide si groupCount est null', () => {
    component.configForm.controls['userCount'].setValue(1);
    component.configForm.controls['groupCount'].setValue(null);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    expect(component.configForm.valid).toBeFalsy();
  });

  it('Le formulaire doit être invalide si userCount est inférieur à 1', () => {
    component.configForm.controls['userCount'].setValue(0);
    component.configForm.controls['groupCount'].setValue(1);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    expect(component.configForm.valid).toBeFalsy();
  });

  it('Le formulaire doit être invalide si groupCount est inférieur à 1', () => {
    component.configForm.controls['userCount'].setValue(1);
    component.configForm.controls['groupCount'].setValue(0);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    expect(component.configForm.valid).toBeFalsy();
  });

  it('Le formulaire doit être valide si tout es ok', () => {
    component.configForm.controls['userCount'].setValue(1);
    component.configForm.controls['groupCount'].setValue(1);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    expect(component.configForm.valid).toBeTruthy();
  });

  it('Doit pouvoir appeler getGroup et createGroup quand on valide', () => {
    component.configForm.controls['userCount'].setValue(1);
    component.configForm.controls['groupCount'].setValue(1);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    component.onSubmit();
    expect(groupService.createGroups).toHaveBeenCalledWith(1, 1, 'LAST_MIN');
    expect(groupService.getGroups).toHaveBeenCalled();
  });

  it('Ne doit pas appeler getGroup ou createGroup si le formulaire est invalid', () => {
    component.configForm.controls['userCount'].setValue(null);
    component.configForm.controls['groupCount'].setValue(null);
    component.configForm.controls['lastGroupConfig'].setValue('LAST_MIN');
    component.onSubmit();
    expect(groupService.createGroups).not.toHaveBeenCalled();
    expect(groupService.getGroups).not.toHaveBeenCalled();
  });

});
