import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'data-table-crud',
  templateUrl: './data-table-crud.component.html',
  styleUrls: ['./data-table-crud.component.css']
})
export class DataTableCrudComponent implements OnInit {

  @Input('disabled') disabled = true;
  @Output('new') newRecord: EventEmitter<any> = new EventEmitter();
  @Output('edit') editRecord: EventEmitter<any> = new EventEmitter();
  @Output('delete') deleteRecord: EventEmitter<any> = new EventEmitter();
  @Output('back') backNavigation: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onNewRecord() {
    this.newRecord.emit();
  }

  onEditRecord() {
    this.editRecord.emit();
  }

  onDeleteRecord() {
    this.deleteRecord.emit();
  }

  onBackNavigation() {
    this.backNavigation.emit();
  }

}
