import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../config/enviroment';
import { LoaderService } from './loader.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class ApiOrchestratorService {
  private baseUrl: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private modalService: ModalService
  ) { }

  private showLoader(): void {
    this.loaderService.showLoader();
  }

  private hideLoader(): void {
    this.loaderService.hideLoader();
  }

  public callApi<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Observable<T> {
    this.showLoader();
    return this.createRequest<T>(endpoint, method, data).pipe(
      finalize(() => this.hideLoader()),
      catchError((error) => this.handleError(error))
    );
  }

  private createRequest<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'ApiToken': this.apiKey
    });

    const options = {
      headers: headers,
      body: method === 'POST' || method === 'PUT' ? data : undefined,
      params: method === 'GET' || method === 'DELETE' ? new HttpParams({ fromObject: data }) : undefined
    };

    return this.http.request<T>(method, url, options);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.modalService.showErrorModal(error.message);
    }
    return throwError(() => new Error('Algo salió mal; por favor intenta nuevamente.'));
  }
}
