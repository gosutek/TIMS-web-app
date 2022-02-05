import { Component, OnInit } from '@angular/core';

declare interface SidebarRouteInfo {
    path: string;
    title: string;
    icon: string;
}

export const SIDEBAR_ROUTES: SidebarRouteInfo[] = [
  { path: '/settlements', title: 'Settlements',  icon: 'text_snippet'},
  { path: '/passes', title: 'Passes',  icon: 'text_snippet'}
];

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarRoutes: SidebarRouteInfo[];

  constructor() { }

  ngOnInit(): void {
      this.sidebarRoutes = SIDEBAR_ROUTES.map(e => e)
  }

}
