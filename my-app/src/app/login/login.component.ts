import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importez Router
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    login: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router // Injectez Router
  ) { }

  ngOnInit(): void {
    this.userService.loadUsers(); // Chargez les utilisateurs au démarrage du composant
  }

  onSubmit(): void {
    const username = this.loginForm.get('login')?.value;
    if (username) {
      const user = this.userService.getUserByName(username); // Récupérez l'utilisateur par son nom
      if (user) {
        if (user.name === 'admin') {
          this.authService.isAdminEntered = true; // Marquer l'admin comme connecté
          this.router.navigate(['/create-group']);
        } else {
          this.router.navigate(['/user-page']);
        }
      } else {
        alert('Utilisateur non trouvé'); // Affichez un message d'erreur si l'utilisateur n'est pas trouvé
      }
    } else {
      alert('Veuillez saisir un nom d\'utilisateur');
    }
  }  
}