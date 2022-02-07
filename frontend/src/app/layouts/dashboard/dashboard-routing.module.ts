import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/config/modules/material.module';
import {SettlementsComponent} from "../../pages/settlements/settlements.component";
import {PassesComponent} from "../../pages/passes/passes.component";

const routes: Routes = [
  { path: 'settlements',  component: SettlementsComponent },
  { path: 'passes',  component: PassesComponent },
  { path: '**', redirectTo: 'settlements', pathMatch: 'full' }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
