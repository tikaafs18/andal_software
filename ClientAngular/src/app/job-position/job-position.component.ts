import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { JobPosition } from '../models/job-position';
import { JobTitle } from '../models/job-title';
import { JobPositionService } from '../services/job-position.service';
import { JobTitleService } from '../services/job-title.service';

@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.scss']
})
export class JobPositionComponent implements OnInit {
  jobPosition: JobPosition[] = [];
  jobTitle: JobTitle[] = [];
  editJobPosition: JobPosition = new JobPosition();

  constructor(private jobPositionService: JobPositionService, private jobTitleService: JobTitleService) { }

  ngOnInit(): void {
    this.jobPosition = [];
    this.jobTitle = [];
    this.editJobPosition = new JobPosition();
    this.get();
    this.getTitle();
  }

  log(val:any) { console.log(val); }

  get() {
    this.jobPositionService.getJobPosition().subscribe((result: JobPosition[]) => (
      result.map(val=>{
        if(val.isDeleted){
          val.newData = 'No job title yet'
        } else {
          val.newData = `${val.title_code} - ${val.title_name}`
        };
        this.jobPosition = result
      })
      ));
  }

  getTitle() {
    this.jobTitleService.getJobTitle().subscribe((result: JobTitle[]) => (
      result.map(val => { if (!val.isDeleted) this.jobTitle.push(val) })));
    this.get();
  }

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(e: any) {
    console.log(e)
    this.gridContainer.instance.saveEditData();
    this.jobPositionService
      .createPosition(e)
      .subscribe(res => {
        this.ngOnInit();
        alert('Add job position success');
      }, err => {
        alert(err);
      })
  }

  cancel() {
    this.gridContainer.instance.cancelEditData();
  }

  edit() {
    this.jobPositionService
      .updatePosition(this.editJobPosition)
      .subscribe(res => {
        this.ngOnInit();
        alert('Edit job position success');
      }, err => {
        alert("Failed to update job position");
      });
  }

  delete(e: any) {
    this.jobPositionService
      .deletePosition(e)
      .subscribe(res => {
        this.ngOnInit();
        alert('Delete job position success');
      }, err => {
        alert("Failed to delete job position");
      });
  }

  addRow() {
    this.gridContainer.instance.addRow();
  }

  call(etask: any) {
    this.editJobPosition = etask;
  }

}
