import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: any[] = [];
  private users: any[] = [];

  constructor() { }
  
  getGroupConfigs(): any[] {
    return this.groups.map(group => ({
      id: group.id,
      size: group.maxSize
    }));
  }

  createGroups(userCount: number, groupCount: number, lastGroupConfig: string) {
    this.groups = [];
    let usersPerGroup = Math.floor(userCount / groupCount);
    let remainingUsers = userCount % groupCount;
  
    // Vérifier si le nombre d'utilisateurs est un multiple du nombre de groupes
    if (remainingUsers === 0) {
      for (let i = 1; i <= groupCount; i++) {
        this.groups.push({ id: i, users: [], size: usersPerGroup });
      }
    } else if (lastGroupConfig === 'LAST_MAX') {
      let extraUsersInGroups = remainingUsers;
  
      for (let i = groupCount; i >= 1; i--) {
        let groupSize = usersPerGroup;
  
        if (i < extraUsersInGroups || i === groupCount) {
          groupSize++;
        }
  
        this.groups.unshift({ id: i, users: [], size: groupSize });
      }
    } else if (lastGroupConfig === 'LAST_MIN') {
      let extraUsersInGroups = remainingUsers;
  
      for (let i = 1; i <= groupCount; i++) {
        let groupSize = usersPerGroup;
  
        if (i <= extraUsersInGroups) {
          groupSize++;
        }
  
        this.groups.push({ id: i, users: [], size: groupSize });
      }
    }
  }  
  
  
  getGroups(): any[] {
    return this.groups;
  }
}
