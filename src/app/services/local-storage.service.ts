import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Esto lo hace disponible en toda la aplicación
})
export class LocalStorageService {
  getItem(arg0: string, title: string) {
    throw new Error('Method not implemented.');
  }

  constructor() {}

  // Métodos para Local Storage

  setLocalItem(key: string, value: any): void {
    LocalStorageService.setItem(key, JSON.stringify(value));
  }
  static setItem(key: string, arg1: string) {
    throw new Error('Method not implemented.');
  }

  getLocalItem(key: string): any {
    const item = JSON.parse(localStorage.getItem(key)!);
    return item ? JSON.parse(item) : null;
  }

  removeLocalItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocal(): void {
    localStorage.clear();
  }

  // Métodos para Session Storage

  setSessionItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  

  getSessionItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearSession(): void {
    sessionStorage.clear();
  }
}