import { ScheduleType } from '../scheduletype';
import { ScheduleSummaryService } from './schedule-summary.service';
import { ScheduleSummary } from './schedulesummary.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-summary',
  templateUrl: './schedule-summary.component.html',
  styleUrls: ['./schedule-summary.component.css']
})
export class ScheduleSummaryComponent implements OnInit {

  today = new Date();
  scheduleSummaries: ScheduleSummary[];

  constructor(
    private scheduleSummaryService: ScheduleSummaryService,
     private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.scheduleSummaryService.getSchedulesSummary(this.today)
      .subscribe(
        response => {this.scheduleSummaries = response; },
        error => {console.log('Something unexpected happened')}
      );
  }

  onRowDblclick(event) {
     this.router.navigate(['schedules', { id: event.data.careCompanyId, scheduleType: ScheduleType.CAMPANY}], {relativeTo: this.route});
  }

}
