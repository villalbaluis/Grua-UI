import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Endpoints } from '../../domain/enums/endpoints.enum';
import { AuthResponse, Cliente, User } from '../../domain/models/user.model';
import { ApiOrchestratorService } from './orchestrator.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUser: User | null = null;

    constructor(
        private apiOrchestrator: ApiOrchestratorService,
        private storageService: StorageService
    ) { }

    login(username: string, password: string): Observable<User> {
        if (username === "ClientePrueba" && password === "ClientePrueba1234.") {
            const mockUser = new User(
                1,
                "ClientePrueba",
                1,
                new Cliente(1, "Camilo Gonzales", "1234567890", "555-1234", "Chevrolet Aveo 2022"),
                undefined
            );
            const mockToken = "mock_token_12345";
            this.currentUser = mockUser;
            this.storageService.setSessionStorage('token', mockToken);
            this.storageService.setSessionStorage('userSession', mockUser);
            return this.getUserDetails(mockToken);
        }

        return this.apiOrchestrator
            .callApi<AuthResponse>(Endpoints.LOGIN, 'POST', { username, password })
            .pipe(
                map((response) => {
                    const authResponse = AuthResponse.fromJson(response);
                    this.currentUser = authResponse.user;
                    this.storageService.setSessionStorage('token', authResponse.token);
                    this.storageService.setSessionStorage('userSession', authResponse.user);
                    return authResponse.token;
                }),
                switchMap((token) => this.getUserDetails(token))
            );
    }

    getUserDetails(token: string): Observable<User> {
        if (this.currentUser && this.currentUser.username === "ClientePrueba") {
            return of(this.currentUser).pipe(
                tap(user => {
                    this.storageService.setSessionStorage('userDetailsSession', user);
                })
            );
        }

        const userId = this.storageService.getSessionStorage('userSession').id;
        return this.apiOrchestrator
            .callApi<User>(`${Endpoints.GET_USER}/${userId}`, 'GET', {
                Authorization: token
            })
            .pipe(
                map((response) => {
                    const userDetails = User.fromJson(response);
                    this.currentUser = userDetails;
                    this.storageService.setSessionStorage('userDetailsSession', userDetails);
                    return this.currentUser;
                })
            );
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}
