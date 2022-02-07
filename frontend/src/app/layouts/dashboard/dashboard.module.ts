import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/config/modules/material.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ComponentsModule,
        MaterialModule
    ]
})
export class DashboardModule { }
