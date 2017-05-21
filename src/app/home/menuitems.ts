/**
 * New typescript file
 */
import { MenuItem } from 'primeng/primeng';
export class MenuBar  {

  public static items: MenuItem[] = [
     {
       label: 'Home', icon: 'fa-home',
     },
     {
       label: 'Companies', icon: 'fa-h-square',
       items: [
                {
                  label: 'Facilities',
                  items: [{ label: 'Placeholder' }, { label: 'Placeholder' }]
                },
                {
                  label: 'Private Cares',
                  items: [{ label: 'Placeholder' }, { label: 'Placeholder' }]
                }
       ]
     },
     {
       label: 'Nurses', icon: 'fa-user-md',
       items: [
                {
                  label: 'New Nurse'
                },
                {
                  label: 'View Nurses'
                }
       ]
     },
     {
       label: 'Care Givers', icon: 'fa-user-md',
       items: [
                {
                  label: 'New Care Giver'
                },
                {
                  label: 'View Care Givers'
                }
       ]
     },
     {
       label: 'Tests', icon: 'fa-check',
       items: [
                {
                  label: 'New Test'
                },
                {
                  label: 'View All Available Tests'
                }
       ]
     },
     {
       label: 'Users', icon: 'fa-users',
     }
  ];
}
