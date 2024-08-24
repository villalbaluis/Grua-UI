import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private config: any;

    constructor(private http: HttpClient) {
        this.loadConfig();
    }

    private loadConfig(): void {
        this.http
            .get('../../config/app-config.json')
            .subscribe((config: any) => {
                this.config = config;
            });
    }

    public getConfig(parent: string, key: string): string | undefined {
        if (this.config && this.config[parent]) {
            return this.config[parent][key];
        }
        return undefined;
    }
}
