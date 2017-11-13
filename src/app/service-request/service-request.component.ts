import { CommonComponent } from '../shared/common';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequest } from './servicerequest';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent extends CommonComponent implements OnInit {

  serviceRequests: ServiceRequest[] = [];
  selectedServiceRequest: ServiceRequest;
  showRequestDetail = false;

  constructor(
    private serviceRequestService: ServiceRequestService,
    private router: Router
  ) { super(null); }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.serviceRequestService.getAll()
      .subscribe(response => {this.serviceRequests = response});
  }

  onRowDblClick() {
    this.changeDisplayPreference();
  }

  onBackBtnClick() {
    this.changeDisplayPreference();
  }

  private changeDisplayPreference() {
    this.showRequestDetail = !this.showRequestDetail;
  }

  gotToHome() {
    this.router.navigate(['../']);
  }

}
