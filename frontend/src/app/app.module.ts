import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './config/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseService } from './services/base.service';
import { CommonModule } from '@angular/common';
import { SettlementsComponent } from './pages/settlements/settlements.component';
import { PassesComponent } from './pages/passes/passes.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SettlementsComponent,
        PassesComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MaterialModule
    ],
    providers: [
        BaseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
