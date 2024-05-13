import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  users: any[] = [];
  usersWithoutGroup: any[] = [];
  groups: any[] = [];
  config: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/users.json').subscribe(users => {
      this.users = users;
      this.usersWithoutGroup = this.users.filter(user => user.groupId === null);
    });

    this.http.get<any[]>('assets/groups.json').subscribe(groups => {
      this.groups = groups;
    });

    // Charge la configuration à partir du fichier JSON
    this.http.get('assets/configGroups.json').subscribe(config => {
      this.config = config;
    });
  }

  generateInvitationLink() {
    return uuidv4();
  }

  createGroup() {
    // Vérifie si le nombre maximum de groupes a été atteint
    if (this.groups.length >= this.config.maxGroups) {
      return;
    }

    const newGroupName = `Groupe ${this.groups.length + 1}`;
    const newGroup = {
      id: this.groups.length + 1,
      name: newGroupName,
      userIds: [],
      maxSize: this.config.groupSize,
      invitationLink: this.generateInvitationLink(),
      currentSize: 0
    };

    this.groups.push(newGroup);

    // Sauvegardez le nouveau groupe dans le fichier JSON
    this.http.put('assets/groups.json', this.groups).subscribe();
  }

  acceptInvitation(userId: number, groupId: number) {
    const user = this.users.find(user => user.id === userId);
    const group = this.groups.find(group => group.id === groupId);
  
    // Vérifie si le groupe a atteint sa taille maximale autorisée
    if (group.userIds.length >= this.config.groupSize) {
      console.log(`Le groupe ${group.name} a atteint sa taille maximale autorisée.`);
      return;
    }
  
    if (user && group && !group.userIds.includes(userId)) {
      user.groupId = groupId;
      group.userIds.push(userId);
      group.currentSize++;
  
      // Sauvegardez les mises à jour dans les fichiers JSON
      this.http.put('assets/users.json', this.users).subscribe();
      this.http.put('assets/groups.json', this.groups).subscribe();
  
      // Met à jour la liste des utilisateurs sans groupe
      this.usersWithoutGroup = this.users.filter(user => user.groupId === null);
    }
  }
  
  

  getUsername(userId: number): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.name : '';
  }
}
