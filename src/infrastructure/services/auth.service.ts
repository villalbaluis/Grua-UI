import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Endpoints } from '../../domain/enums/endpoints.enum';
import { AuthResponse, User } from '../../domain/models/user.model';
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
