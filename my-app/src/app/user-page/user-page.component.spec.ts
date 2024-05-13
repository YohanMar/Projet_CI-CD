import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserPageComponent } from './user-page.component';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load users and groups', () => {
  //   const users = component.users;
  //   const groups = component.groups;

  //   expect(users.length).toBeGreaterThan(0);
  //   expect(groups.length).toBeGreaterThan(0);
  // });

  it('should generate an invitation link', () => {
    const invitationLink = component.generateInvitationLink();

    expect(invitationLink).not.toBeNull();
    expect(invitationLink).not.toBe('');
  });

  it('should create a new group', () => {
    const initialGroupsLength = component.groups.length;

    component.createGroup();
    fixture.detectChanges();

    expect(component.groups.length).toBe(initialGroupsLength + 1);
  });

  // it('should accept an invitation', () => {
  //   const userWithoutGroup = component.usersWithoutGroup[0];
  //   const group = component.groups[0];

  //   component.acceptInvitation(userWithoutGroup.id, group.id);
  //   fixture.detectChanges();

  //   expect(userWithoutGroup.groupId).toEqual(group.id);
  //   expect(group.userIds.includes(userWithoutGroup.id)).toBeTrue();
  //   expect(component.usersWithoutGroup.includes(userWithoutGroup)).toBeFalse();
  // });
});
