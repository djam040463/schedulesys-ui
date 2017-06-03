/**
 * ToolBar
 */
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

export class MenuBar  {


  constructor(public isAdmin: boolean) {}

   getMenuItems(): MenuItem[] {
    return [
     {
       label: 'Home', icon: 'fa-home', routerLink: './'
     },
     {
       label: 'Companies', icon: 'fa-hospital-o', routerLink: 'companies'
     },
     {
       label: 'Employees', icon: 'fa-user-md', routerLink: 'employees'
     },
     {
       label: 'Schedules', icon: 'fa-clock-o'
     },
     {
       label: 'Tests', icon: 'fa-book',
     },
     {
       label: 'Users', icon: 'fa-users', routerLink: 'users', disabled: !this.isAdmin
     }
     ];
  }
}
