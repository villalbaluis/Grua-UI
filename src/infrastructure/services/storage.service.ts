import { Injectable } from '@angular/core';
import {
    LocalStorageService,
    SessionStorageService,
} from 'angular-web-storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor(
        private localStorageService: LocalStorageService,
        private sessionStorageService: SessionStorageService
    ) {}

    // Local Storage methods.
    public setLocalStorage(key: string, value: any, timeout: number = 0) { // Guardar nuevo dato en Local Storage
        if (value != null) {
            this.localStorageService.set(key, value, timeout, 't');
        }
    }

    public getLocalStorage(key: string) { // Obtener un dato del Local Storage
        return this.localStorageService.get(key);
    }

    public removeAllLocalStorage() { // Limpiar todo el Local Storage
        this.localStorageService.clear();
    }

    public removeLocalStorage(key: string) { // Quitar un solo objeto del Local Storage
        this.localStorageService.remove(key);
    }
    
    // Session Storage methods.
    public setSessionStorage(key: string, value: any, timeout: number = 0) { // Guardar nuevo dato en Session Storage
        if (value != null) {
            this.sessionStorageService.set(key, value, timeout, 't');
        }
    }

    public getSessionStorage(key: string) { // Obtener dato de Session Storage
        return this.sessionStorageService.get(key);
    }

    public removeSessionStorage(key: string) { // Remover dato del session storage
        this.sessionStorageService.remove(key);
    }

    public removeAllSessionStorage() { // Limpiar todos los datos del Session Storage
        this.sessionStorageService.clear();
    }
}
