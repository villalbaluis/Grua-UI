import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../infrastructure/services/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
    isLoading = false;

    constructor(
      private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.loaderService.loading$.subscribe((isLoading) => {
            this.isLoading = isLoading;
        });
    }
}
