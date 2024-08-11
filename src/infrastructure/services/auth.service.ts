import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): Observable<User> {
    // Aquí iría la lógica real de autenticación
    // Por ahora, simplemente devolvemos un usuario mock
    return of(new User('1', username, `${username}@example.com`, password));
  }
}