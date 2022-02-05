import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/config/modules/material.module';
import { ClientVisitsComponent } from 'src/app/pages/clients/client-visits/client-visits.component';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';
import { PossibleInfectionsComponent } from 'src/app/pages/clients/possible-infections/possible-infections.component';
import { ServicesComponent } from 'src/app/pages/services/services.component';
import { UsageComponent } from 'src/app/pages/usage/usage.component';
import {SettlementsComponent} from "../../pages/settlements/settlements.component";
import {PassesComponent} from "../../pages/passes/passes.component";

const routes: Routes = [
    // { path: 'clients',
    //   children: [
    //       {
    //           path: '',
    //           component: ClientsComponent
    //       },
    //       {
    //           path: 'client-visits',
    //           component: ClientVisitsComponent
    //       },
    //       {
    //           path: 'possible-infections',
    //           component: PossibleInfectionsComponent
    //       },
    // ]},
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
