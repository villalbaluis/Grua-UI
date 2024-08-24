import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    ) {}

    login(username: string, password: string): Observable<User> {
        return this.apiOrchestrator
            .callApi<AuthResponse>(Endpoints.LOGIN, 'POST', {username, password})
            .pipe(
                map((response) => {
                    const authResponse = AuthResponse.fromJson(response);
                    this.currentUser = authResponse.user;
                    this.storageService.setSessionStorage('token', authResponse.token);
                    this.storageService.setSessionStorage('userSession', authResponse.user);
                    return this.currentUser;
                })
            );
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}
