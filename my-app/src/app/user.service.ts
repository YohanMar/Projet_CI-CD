import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];

  constructor(private http: HttpClient) { }

  loadUsers(): void {
    this.http.get<any[]>('assets/users.json').subscribe(data => { // Utilisez le chemin correct vers votre fichier JSON
      this.users = data;
    });
  }

  getUsers(): any[] {
    return this.users;
  }

  getUserByName(name: string): any {
    return this.users.find(user => user.name === name);
  }
}
