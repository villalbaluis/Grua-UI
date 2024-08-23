import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiOrchestratorService {

  private isLoading = false;

  constructor(private http: HttpClient) {}

  private showLoader(): void {
    this.isLoading = true;
    console.log('Loader shown');
  }

  private hideLoader(): void {
    this.isLoading = false;
    console.log('Loader hidden');
  }

  public callApi<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Observable<T> {
    this.showLoader();
    return this.createRequest<T>(endpoint, method, data).pipe(
      finalize(() => this.hideLoader()),
      catchError(this.handleError)
    );
  }

  private createRequest<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Observable<T> {
    const options = {
      body: method === 'POST' || method === 'PUT' ? data : undefined,
      params: method === 'GET' || method === 'DELETE' ? new HttpParams({ fromObject: data }) : undefined
    };

    return this.http.request<T>(method, endpoint, options);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`API call error: ${error.message}`);
    return throwError(() => new Error('Algo salió mal; por favor intenta nuevamente.'));
  }
}
