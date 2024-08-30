import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../UI/auth/auth.module';
import { HomeModule } from '../UI/home/home.module';
import { LoaderComponent } from '../UI/shared/loader/loader.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, LoaderComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        RouterModule,
        NgbModule,
        AuthModule,
        HomeModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
