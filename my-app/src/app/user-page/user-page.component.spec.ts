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

    // Affecte une valeur fixe à component.config.maxGroups
    component.config = { maxGroups: 5, groupSize: 4 };

    // Crée un utilisateur et un groupe factices pour le test
    const user = { id: 1, name: 'John Doe', groupId: null };
    const group = { id: 1, name: 'Group 1', userIds: [], maxSize: 4, invitationLink: '', currentSize: 0 };

    component.users = [user];
    component.groups = [group];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should not create a new group if maxGroups is reached', () => {
    const initialGroupsLength = component.groups.length;
    const maxGroups = component.config.maxGroups;

    for (let i = initialGroupsLength; i < maxGroups; i++) {
      component.createGroup();
    }

    component.createGroup();
    fixture.detectChanges();

    expect(component.groups.length).toBe(maxGroups);
  });

  it('should not accept an invitation if group is full', () => {
    const userWithoutGroup = { id: 1, name: 'John Doe', groupId: null };
    const group = { id: 1, name: 'Group 1', userIds: [2, 3, 4, 5], maxSize: 4, invitationLink: '', currentSize: 4 };
  
    component.acceptInvitation(userWithoutGroup.id, group.id);
    fixture.detectChanges();
  
    fixture.whenStable().then(() => {
      expect(userWithoutGroup.groupId).toBeNull();
      expect(group.userIds.includes(userWithoutGroup.id)).toBeFalse();
      expect(component.usersWithoutGroup.includes(userWithoutGroup)).toBeTrue();
    });
  });
});
