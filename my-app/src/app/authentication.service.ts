import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAdminEntered: boolean = false;
  constructor(private http: HttpClient) { }

  login(username: string): Observable<boolean> {
    // Appel HTTP pour charger le fichier JSON
    return this.http.get<any[]>('data/users.json').pipe(
      map(users => {
        // Vérification si l'utilisateur est "admin"
        if (username === 'admin') {
          this.isAdminEntered = true;
          return true; // Redirigez l'utilisateur vers "/create-group"
        }
        // Vérification si l'utilisateur est présent dans le JSON
        const user = users.find(u => u.name === username);
        if (user) {
          return true; // Redirigez l'utilisateur vers une autre page
        }
        // Si l'utilisateur n'est ni "admin" ni présent dans le JSON, retourne false
        return false;
      })
    );
  }
}
