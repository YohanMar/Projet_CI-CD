import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create groups with equal size when user count is a multiple of group count', () => {
    service.createGroups(10, 5, 'LAST_MIN');
    const groups = service.getGroups();
  
    expect(groups.length).toBe(5);
    groups.forEach(group => {
      expect(group.size).toBe(2);
    });
  });
  
  it('should create groups with LAST_MAX config', () => {
    service.createGroups(11, 5, 'LAST_MAX');
    const groups = service.getGroups();
  
    expect(groups.length).toBe(5);
    expect(groups[0].size).toBe(2);
    expect(groups[1].size).toBe(2);
    expect(groups[2].size).toBe(2);
    expect(groups[3].size).toBe(2);
    expect(groups[4].size).toBe(3);
  });
  
  it('should create groups with LAST_MIN config', () => {
    service.createGroups(11, 5, 'LAST_MIN');
    const groups = service.getGroups();
  
    expect(groups.length).toBe(5);
    expect(groups[0].size).toBe(3);
    expect(groups[1].size).toBe(2);
    expect(groups[2].size).toBe(2);
    expect(groups[3].size).toBe(2);
    expect(groups[4].size).toBe(2);
  });

  it('should have a total user size in groups equal to the initial user count', () => {
    const userCount = 27;
    const groupCount = 10;
    const lastGroupConfig = 'LAST_MIN';
  
    service.createGroups(userCount, groupCount, lastGroupConfig);
    const groups = service.getGroups();
  
    let totalUserSizeInGroups = 0;
    groups.forEach(group => {
      totalUserSizeInGroups += group.size;
    });
  
    expect(totalUserSizeInGroups).toBe(userCount);
  });
});
